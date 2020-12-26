<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {
	public function index()
	{
		echo 1;
		$this->load->view('home.html');
	}
}
