import { LineProps } from "../types";

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 20;
const DEFAULT_STROKE_WIDTH = 10;
const MAX_VALUE = 100;

export const LinearProgress = ({
	minValue,
	maxValue,
	selectedValue,
	width,
	height,
	label,
	activeStrokeColor,
	inactiveStrokeColor,
	backgroundColor,
	textColor,
	valueFontSize,
}: LineProps) => {
	const strokeWidth: number = 10;
	const progress = Math.min(Math.max(selectedValue!, 0), maxValue!);

	const percentage = maxValue! <= 100 ? ((progress / maxValue!) * 100).toFixed(0) : progress.toFixed(0);

	const indicatorLabel = `${percentage}%`;

	const progressWidth = (progress / maxValue!) * (width! - strokeWidth!);

	return (
		<div style={{ position: "relative" }}>
			<div
				style={{
					position: "absolute",
					bottom: -height!,
					textAlign: "center",
					minWidth: valueFontSize,
					color: textColor,
					fontSize: valueFontSize,
				}}
			>
				{minValue}
			</div>
			<div
				style={{
					position: "absolute",
					top: -height!,
					left: progressWidth,
					textAlign: "center",
					minWidth: valueFontSize,
					color: textColor,
					fontSize: valueFontSize,
					fontWeight: "bold",
				}}
			>
				{indicatorLabel}
				<span> {label}</span>
			</div>

			<div
				style={{
					position: "absolute",
					bottom: -height!,
					left: width!,
					textAlign: "center",
					minWidth: valueFontSize,
					color: textColor,
					fontSize: valueFontSize,
				}}
			>
				{maxValue}
			</div>
			<svg width={width} height={height}>
				<rect x={strokeWidth! / 2} y={strokeWidth! / 2} width={width! - strokeWidth!} height={height! - strokeWidth!} rx={height! / 2} ry={height! / 2} fill={backgroundColor} />
				<rect x={strokeWidth! / 2} y={strokeWidth! / 2} width={progressWidth} height={height! - strokeWidth!} rx={height! / 2} ry={height! / 2} fill={activeStrokeColor} />
				<rect
					x={strokeWidth! / 3 + progressWidth}
					y={strokeWidth! / 2}
					width={width! - strokeWidth! - progressWidth}
					height={height! - strokeWidth!}
					rx={height! / 2}
					ry={height! / 2}
					fill={inactiveStrokeColor}
				/>
			</svg>
		</div>
	);
};

LinearProgress.defaultProps = {
	minValue: 0,
	maxValue: MAX_VALUE,
	selectedValue: 0,
	width: DEFAULT_WIDTH,
	height: DEFAULT_HEIGHT,
	strokeWidth: DEFAULT_STROKE_WIDTH,
	activeStrokeColor: "#00ffa2",
	label: "",
	inactiveStrokeColor: "#ddd",
	backgroundColor: "#fff",
	textColor: "#000",
	valueFontSize: 12,
	isPercentage: false,
};
