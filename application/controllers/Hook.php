<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Hook extends CI_Controller {
	public function index(){
		$id = $_POST("id");
		$data = $_POST("data");

		var_dump($id);
		var_dump($data);
	}
}
