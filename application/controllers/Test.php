<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {
	public function index(){
		$mc = new Memcached();
		$mc->setOption(Memcached::OPT_BINARY_PROTOCOL, true);
		$mc->addServers(array_map(function($server) { return explode(':', $server, 2); }, explode(',', MEMCACHEDCLOUD_SERVERS)));
		$mc->setSaslAuthData(MEMCACHEDCLOUD_USERNAME,MEMCACHEDCLOUD_PASSWORD);

		$mc->set('welcome_msg', 'Hello from Redis!');
		$result = $mc->get('welcome_msg');
		var_dump($result);
	}
}
