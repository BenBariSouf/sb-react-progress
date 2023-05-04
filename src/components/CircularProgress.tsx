import { CircleProps } from "../types";
import { shadeColor } from "../utils";

const DEFAULT_RADIUS = 60;
const MAX_VALUE = 100;

const Direction = {
	CLOCKSWISE: -1,
	ANTI_CLOCKWISE: 1,
};

export const CircularProgress = ({
	maxValue,
	selectedValue,
	radius,
	strokeWidth,
	label,
	activeStrokeColor,
	inactiveStrokeColor,
	backgroundColor,
	textColor,
	labelFontSize,
	valueFontSize,
	withGradient,
	anticlockwise,
	initialAngularDisplacement,
}: CircleProps) => {
	const progress: number = Math.min(Math.max(selectedValue!, 0), maxValue!);

	const percentage: string = maxValue! <= 100 ? ((progress / maxValue!) * 100).toFixed(0) : progress.toFixed(0);

	const indicatorLabel: string = `${percentage}%`;

	// ----  PIE calculation function --------
	const generatePie = (value: number) => {
		const x = radius! - Math.cos((2 * Math.PI) / (100 / value)) * radius!;
		const y = radius! + Math.sin((2 * Math.PI) / (100 / value)) * radius!;
		const long = value <= 50 ? 0 : 1;
		const d = `M${radius} ${radius} L${radius} ${0} A${radius} ${radius} 0 ${long} 1 ${y} ${x} Z`;

		return d;
	};

	// ----  PIE Area calculation  --------
	const calculatePieValue = (numberOfBars: number) => {
		const angle = 360 / numberOfBars;
		const pieValue = Math.floor(angle / 4);
		return pieValue < 1 ? 1 : Math.floor(angle / 4);
	};

	// ----  PIE render function --------
	const renderPie = (i: number) => {
		const DIRECTION = anticlockwise ? Direction.ANTI_CLOCKWISE : Direction.CLOCKSWISE;
		// Rotation Calculation
		const primaryRotationAngle: number = (maxValue! - 1) * (360 / maxValue!);
		const rotationAngle: number = DIRECTION * initialAngularDisplacement! + -1 * DIRECTION * primaryRotationAngle + i * DIRECTION * primaryRotationAngle;
		const rotationTransformation: string = `rotate(${rotationAngle}, ${radius}, ${radius})`;

		const pieValue = calculatePieValue(maxValue!);
		const dValue = generatePie(pieValue);

		const activeColor: string | undefined = withGradient ? shadeColor(activeStrokeColor!, ((i + 1) * maxValue!) / 50) : activeStrokeColor;

		const fillColor: string | undefined = selectedValue! > 0 && i <= selectedValue! ? activeColor : inactiveStrokeColor;

		return <path style={{ opacity: i === 0 ? 0 : 1 }} key={i} d={dValue} fill={fillColor} transform={rotationTransformation} />;
	};

	// ----  Creates a circle by combining the Pie(s) --------
	const renderOuterCircle = () => [...Array(maxValue! + 1)].map((_, i: number) => renderPie(i));

	const labelView = (
		<text fill={textColor} fontSize={labelFontSize} x={radius} y={radius! + labelFontSize!} textAnchor="middle">
			{label}
		</text>
	);

	const textValueY: any = label ? radius : radius! + valueFontSize! / 3;

	// --------  MAIN Render --------
	return (
		<svg width={radius! * 2} height={radius! * 2}>
			{renderOuterCircle()}
			{/* This is the overlay circle */}
			<circle r={radius! - strokeWidth!} cx={radius} cy={radius} fill={backgroundColor} />
			{percentage === "100" && (
				<text fill={textColor} fontSize={valueFontSize! / 1.5} x={radius} y={textValueY! * 0.3} textAnchor="middle">
					{maxValue}
				</text>
			)}
			<text fill={textColor} fontSize={valueFontSize} fontWeight="bold" x={radius} y={textValueY} textAnchor="middle">
				{indicatorLabel}
			</text>
			{!!label?.length && labelView}
		</svg>
	);
};

CircularProgress.defaultProps = {
	maxValue: MAX_VALUE,
	selectedValue: 0,
	radius: DEFAULT_RADIUS,
	strokeWidth: DEFAULT_RADIUS / 10,
	label: "",
	activeStrokeColor: "#05a168",
	inactiveStrokeColor: "#ddd",
	backgroundColor: "#fff",
	textColor: "#000",
	labelFontSize: Math.floor(DEFAULT_RADIUS / 3),
	valueFontSize: Math.floor(DEFAULT_RADIUS / 3.5),
	withGradient: false,
	anticlockwise: false,
	initialAngularDisplacement: 0,
};
