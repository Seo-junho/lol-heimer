<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends MY_Controller {
	public function index(){
		echo RIOT_API_KEY;
	}
}
