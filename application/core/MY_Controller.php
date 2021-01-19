<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class MY_Controller extends CI_Controller {
	function __construct() {
		parent::__construct();

		define("RIOT_API_KEY", $this->getRiotApiKey());
	}

	public function getRiotApiKey()
	{
		$this->load->database();

		$sql = "SELECT * FROM env_config WHERE status = 'A' ";

		$result = $this->db->query($sql)->result('object')[0];

		$this->db->close();

		return $result->config_value;
	}
}
