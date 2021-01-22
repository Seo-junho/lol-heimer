<?php
defined('BASEPATH') or exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

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
			$result['code'] = 400;
			$result['message'] = '아이디를 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		if ($password == '') {
			$result['code'] = 400;
			$result['message'] = '패스워드를 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		if ($name == '') {
			$result['code'] = 400;
			$result['message'] = '이름을 입력 해 주세요.';
			echo json_encode($result);
			return;
		}

		$sql = "
				INSERT INTO member 
				(id,password,name,register_date) 
				VALUES 
				('{$id}',password('{$password}'), '{$name}', now() ) ";

		$this->load->database();
		$result = $this->db->query($sql);
		$this->db->close();

		if ($result) {
			$result['code'] = 200;
			$result['message'] = '가입이 완료되었습니다.';
		} else {
			$result['code'] = 400;
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

		$id = $_POST['id'];
		$password = $_POST['password'];

		$sql = "
			SELECT * FROM member 
			WHERE id = '{$id}' AND password = password('{$password}') AND status = 'A'
		";

		$this->load->database();
		$result = $this->db->query($sql)->result('object');
		$this->db->close();

		if(!empty($result)) {
			$result['code'] = 200;
			$result['message'] = '로그인 되었습니다';
			$result['id'] = $result[0]->id;
			$_SESSION['id'] = $result[0]->id;
		} else {
			$result['code'] = 400;
			$result['message'] = '아이디 비번이 틀렸거나 없는 회원입니다.';
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

		$id = $_POST['id'];

		$sql = "
			SELECT * FROM member 
			WHERE id = '{$id}' AND status = 'A'
		";

		$this->load->database();
		$result = $this->db->query($sql)->result('object');
		$this->db->close();

		if(!empty($result)) {
			$result['code'] = 400;
			$result['message'] = '이미 중복된 아이디 입니다.';
		} else {
			$result['code'] = 200;
			$result['message'] = '사용 가능한 아이디 입니다.';
		}

		echo json_encode($result);
		return;
	}
}
