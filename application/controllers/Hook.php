<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Hook extends CI_Controller {
	public function index(){
		$id = $this->input->get_post("id");
		$data = $this->input->get_post("data");

		var_dump($id);
		var_dump($data);
	}
}
