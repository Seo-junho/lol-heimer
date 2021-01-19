<?php
defined('BASEPATH') or exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Member extends MY_Controller
{
	public function index()
	{

	}

	public function signup()
	{
		$id = $_POST['id'];
		$password = $_POST['password'];
		$name = $_POST['name'];

		$result = [];

		$name = $this->input->get_post("name");

		$sql = "INSERT INTO member (id,password,name,register_date) VALUES ('{$name}',password('{$password}'), '{$name}', now() ) ";

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

	public function login()
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
			$result['message'] = '가입이 완료되었습니다.';
			$result['id'] = $result[0]->id;
			$_SESSION['id'] = $result[0]->id;
		} else {
			$result['code'] = 400;
			$result['message'] = '아이디 비번이 틀렸거나 없는 회원입니다.';
		}

		echo json_encode($result);
		return;
	}
}
