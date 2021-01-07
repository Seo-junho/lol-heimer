<?php

class Hook {
	public function index()
	{
		$id = $this->input->get_post("id");
		$data = $this->input->get_post("id");

		var_dump($id);
		var_dump($data);
		//https://discord.com/api/webhooks/796801844650180648/SjmPL7avF27zjkAJA8VKyOnHVwGo9gFzvTlEC9pINGpCK9V-nzuCne3x8EweD_sjU-25
	}

}

