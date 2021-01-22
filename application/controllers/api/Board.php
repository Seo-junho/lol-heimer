<?php
defined('BASEPATH') or exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");

class Board extends MY_Controller
{
	public function index()
	{

	}

	/**
	 * 게시판 - 글 작성
	 */
	public function createBoard()
	{
		$result = [];

		$data = $this->input->get_post('data');
		$board = json_decode($data);

		if (empty($board['subject_idx'])) {
			$result['status'] = 400;
			$result['message'] = '분류를 선택 해 주세요.';
			echo json_encode($result);
			return;
		}

		if (empty($board['title'])) {
			$result['status'] = 400;
			$result['message'] = '제목을 작성 해 주세요.';
			echo json_encode($result);
			return;
		}

		if (empty($board['description'])) {
			$result['status'] = 400;
			$result['message'] = '내용을 작성 해 주세요.';
			echo json_encode($result);
			return;
		}

		if (empty($board['writer_id'])) {
			$result['status'] = 400;
			$result['message'] = '작성자 아이디가 없습니다.';
			echo json_encode($result);
			return;
		}

		$sql = "
				INSERT INTO board 
					( subject_idx, title, description, writer_id, created_date_time, modify_date_time ) 
				VALUES 
					( {$board['subject_idx']}, {$board['title']}, {$board['description']}, {$board['writer_id']}, now(), now())  ";

		$this->load->database();
		$response = $this->db->query($sql);
		$this->db->close();

		if ($response) {
			$result['status'] = 200;
			$result['message'] = '작성이 완료 되었습니다.';
		} else {
			$result['status'] = 400;
			$result['message'] = '작성이 실패 했습니다.';
		}

		echo json_encode($result);
		return;
	}

	/**
	 * 게시판 - 글 리스트 가져오기
	 */
	public function getBoardList()
	{
		$result = [];

		$sql = "
			SELECT * FROM board 
			WHERE status = 'A'
		";

		$this->load->database();
		$list = $this->db->query($sql)->result('array');

		$this->db->close();

		$result['status'] = 200;
		$result['message'] = $list;

		echo json_encode($result);
		return;
	}

	/**
	 * 게시판 글 삭제
	 * @param int $board_idx 게시판 글 idx
	 */
	public function removeBoard(int $board_idx)
	{
		$result = [];

		$sql = "
			UPDATE board SET status = 'D', delete_date_time = now()
			WHERE idx = {$board_idx} 
		";

		$response = $this->db->query($sql);

		if ($response) {
			$result['status'] = 200;
			$result['message'] = '작성이 완료 되었습니다.';
		} else {
			$result['status'] = 400;
			$result['message'] = '작성이 실패 했습니다.';
		}

		echo json_encode($result);
		return;
	}

	/**
	 * 게시판 - 주제 가져오기
	 */
	public function getSubjectList()
	{
		$sql = "
			SELECT * FROM board_subject 
			WHERE status = 'A'
		";

		$this->load->database();
		$result = $this->db->query($sql)->result('array');

		$this->db->close();

		return $result;
	}
}
