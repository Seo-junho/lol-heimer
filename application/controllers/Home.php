<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
	public function index()
	{
		$this->load->view('home.html');
	}

	public function user()
	{
		$this->load->view('home.html');
	}
}
