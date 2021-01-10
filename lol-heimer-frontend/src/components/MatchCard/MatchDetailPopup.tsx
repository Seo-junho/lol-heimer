import React from 'react';

interface IProps {

};

const MatchDetailPopup: React.FC = () => {
	return (
		<div className="fixed top-0 left-0 z-50 flex justify-center items-center">
			<div className="absolute shadow-lg mb-5 w-full lg:max-w-5xl p-5 bg-gray-100 flex flex-col sm:flex-row items-center justify-center border border-white rounded-xl z-50">
				popup
			</div>
			<div className="w-screen h-screen bg-black opacity-30"></div>
		</div>
	);
}

export default MatchDetailPopup;
