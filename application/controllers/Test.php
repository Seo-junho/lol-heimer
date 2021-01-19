<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {
	public function index(){
		$this->load->database();
		$sql = "SELECT * FROM env_config WHERE status = 'A' ";
		$result = $this->db->query($sql)->result('object');
		$this->db->close();
		var_dump($result);
	}
}
