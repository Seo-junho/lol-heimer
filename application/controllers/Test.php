<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {
	public function index(){
		$this->load->database();
		$a = $this->db->query("SELECT * FROM env_config ");
		var_dump($a);
	}
}
