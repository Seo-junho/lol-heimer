<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller {
	public function index()
	{
		$this->load->view('home.html');
	}

	public function user($user_name)
	{
		$this->load->view('home.html');
	}
}
