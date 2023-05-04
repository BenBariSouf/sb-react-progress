import { useState } from "react";
import "./App.css";
import { CircularProgress, LinearProgress } from "./components";

function App() {
	const [value, setValue] = useState(0);

	let am = 0;
	const progress = () => {
		const interval = setInterval(() => {
			if (am < 100) {
				am = am + 1;
				setValue(am);
				console.log("value", value);
			}
		}, 10);
		if (value == 100) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	};

	return (
		<>
			<div className="card">
				<button onClick={progress}>Simulate progress</button>
				<button
					onClick={() => {
						setValue(0);
					}}
				>
					Reset
				</button>
				<p>{value}</p>
			</div>
			<div style={{ display: "flex", justifyItems: "center", alignItems: "flex-end" }}>
				<CircularProgress
					selectedValue={value}
					maxValue={95}
					radius={80}
					label="soufiane"
					activeStrokeColor="#458fdd"
					labelFontSize={8}
					valueFontSize={14}
					withGradient
					initialAngularDisplacement={19}
					backgroundColor="#ffcc"
					textColor="#aa5588"
				/>

				<CircularProgress
					selectedValue={value}
					maxValue={10}
					textColor="#f00"
					activeStrokeColor="#cc6600"
					withGradient
					// backgroundColor="#a5acd6aa"
					strokeWidth={3}
				/>
				<CircularProgress selectedValue={value} maxValue={100} radius={100} activeStrokeColor="#0f4fff" withGradient />
				<CircularProgress selectedValue={value} maxValue={90} radius={80} activeStrokeColor="#cc6633" withGradient anticlockwise />
				<CircularProgress selectedValue={value} maxValue={20} radius={45} activeStrokeColor="#33b5cc" withGradient />
				<LinearProgress
					selectedValue={value}
					maxValue={100}
					isPercentage
					// textColor="#c60303"
					width={500}
					height={20}
					// strokeWidth={10}
					activeStrokeColor="#45ad"
				/>
			</div>
		</>
	);
}

export default App;
