import React from 'react';

const SkeletonMatchCard: React.FC = () => {
	const itemBoxStyle = {
		width: '40px',
		height: '40px',
	};

	return (
		<div className={`shadow-lg mb-5 w-full p-10 flex flex-col sm:flex-row items-center justify-center bg-gray-200 border border-white rounded-xl`}>
			<div className="animate-pulse flex-grow-0 flex flex-col sm:flex-row justify-center items-center mx-auto">
				<div className="flex sm:flex-col justify-center items-center mt-1">
					<div className="sm:pb-2 bg-gray-300 w-10 md:w-20 h-5"></div>
					<div className="px-3 font-bold bg-gray-300 w-10 h-5 my-1"></div>
					<div className="bg-gray-300 w-10 md:w-20 h-5"></div>
				</div>
				<div className="flex-grow-0 w-40 flex flex-row">
					<div className="flex flex-col justify-center items-center p-3">
						<div
							className="border border-gray-300 rounded-full bg-gray-300"
							style={{
								width: '100px',
								height: '100px',
							}}
						/>
						<div className="mt-1 bg-gray-300 w-24 h-5"></div>
					</div>
					<div className="flex flex-col justify-center items-center my-2">
						<div
							className="bg-gray-300 mb-1"
							style={itemBoxStyle}
						/>
						<div
							className="bg-gray-300 mb-1"
							style={itemBoxStyle}
						/>
					</div>
				</div>
				<div className="px-5 flex flex-col justify-center items-center">
					<div className="bg-gray-300 w-20 md:w-28 h-7 mt-1"></div>
					<div className="bg-gray-300 w-20 md:w-28 h-7 mt-1"></div>
					<div className="bg-gray-300 w-20 md:w-28 h-5 mt-1"></div>
				</div>
				<div className="flex flex-col justify-center items-center py-3">
					<div className="bg-gray-300 w-12 md:w-16 h-4 mt-1"></div>
					<div className="bg-gray-300 w-12 md:w-16 h-4 mt-1"></div>
				</div>
				<div className="mx-3">
					<div className="flex flex-col">
						<div className="flex flex-row">
							<div
								className={`rounded-md bg-gray-300 m-0.5`}
								style={itemBoxStyle}
							/>
							<div
								className={`rounded-md bg-gray-300 m-0.5`}
								style={itemBoxStyle}
							/>
							<div
								className={`rounded-md bg-gray-300 m-0.5`}
								style={itemBoxStyle}
							/>
							<div
								className={`rounded-md bg-gray-300 m-0.5`}
								style={itemBoxStyle}
							/>
						</div>
						<div className="flex flex-row">
							<div
								className={`rounded-md bg-gray-300 m-0.5`}
								style={itemBoxStyle}
							/>
							<div
								className={`rounded-md bg-gray-300 m-0.5`}
								style={itemBoxStyle}
							/>
							<div
								className={`rounded-md bg-gray-300 m-0.5`}
								style={itemBoxStyle}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SkeletonMatchCard;
