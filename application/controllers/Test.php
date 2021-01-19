<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {
	public function index(){
		$db = $this->load->database();
		$a = $db->query("SELECT * FROM env_config ");
		var_dump($a);
	}
}
