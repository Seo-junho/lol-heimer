<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Member extends MY_Controller
{
	public function index()
	{

	}

	/**
	 * 회원 가입
	 */
	public function signupMember()
	{
		$result = [];

		$id = $this->input->get_post('id');
		$password = $this->input->get_post('password');
		$name = $this->input->get_post('name');

		if ($id == '') {
			$result['status'] = 400;
			$result['message'] = '아이디를 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		if ($password == '') {
			$result['status'] = 400;
			$result['message'] = '패스워드를 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		if ($name == '') {
			$result['status'] = 400;
			$result['message'] = '이름을 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		$sql = "
				INSERT INTO member 
				(id,password,name,register_date_time) 
				VALUES 
				('{$id}',password('{$password}'), '{$name}', now() ) ";

		$this->load->database();
		$response = $this->db->query($sql);
		$this->db->close();

		if ($response) {
			$result['status'] = 200;
			$result['message'] = '가입이 완료 되었습니다.';
		} else {
			$result['status'] = 400;
			$result['message'] = '회원 가입이 실패 하였습니다.';
		}

		echo json_encode($result);
		return;
	}

	/**
	 * 로그인
	 */
	public function loginMember()
	{
		$result = [];

		$id = $this->input->get_post('id');
		$password = $this->input->get_post('password');

		if ($id == '') {
			$result['status'] = 400;
			$result['message'] = '아이디를 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		if ($password == '') {
			$result['status'] = 400;
			$result['message'] = '패스워드를 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		$sql = "
			SELECT * FROM member 
			WHERE id = '{$id}' AND password = password('{$password}') AND status = 'A'
		";

		$this->load->database();
		$member = $this->db->query($sql)->result('object');
		$this->db->close();

		if(!empty($member)) {
			$result['status'] = 200;
			$result['message'] = '로그인 되었습니다';
			$result['id'] = $member[0]->id;
		} else {
			$result['status'] = 400;
			$result['message'] = '아이디/비번이 틀렸거나 없는 회원입니다.';
		}

		echo json_encode($result);
		return;
	}

	/**
	 * 아이디 중복 검사
	 */
	public function checkId()
	{
		$result = [];

		$id = $this->input->get_post('id');

		$sql = "
			SELECT * FROM member 
			WHERE id = '{$id}' AND status = 'A'
		";

		$this->load->database();
		$result = $this->db->query($sql)->result('object');
		$this->db->close();

		if(!empty($result)) {
			$result['status'] = 400;
			$result['message'] = '이미 중복된 아이디 입니다.';
		} else {
			$result['status'] = 200;
			$result['message'] = '사용 가능한 아이디 입니다.';
		}

		echo json_encode($result);
		return;
	}

	/**
	 * 회원 탈퇴
	 * @param int $member_idx 회원 idx
	 */
	public function leaveMember(int $member_idx)
	{
		$result = [];

		$sql = "
			UPDATE member SET status = 'D', leave_date_time = now()
			WHERE idx = {$member_idx} 
		";

		$response = $this->db->query($sql);

		if ($response) {
			$result['status'] = 200;
			$result['message'] = '탈퇴 되었습니다';
		} else {
			$result['status'] = 400;
			$result['message'] = '탈퇴가 실패 하였습니다.';
		}

		echo json_encode($result);
		return;
	}
}
