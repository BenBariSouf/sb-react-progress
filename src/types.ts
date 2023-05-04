export type CircleProps = {
	maxValue?: number;
	selectedValue?: number;
	radius?: number;
	strokeWidth?: number;
	label?: string;
	activeStrokeColor?: string;
	height?: number;
	width?: number;
	inactiveStrokeColor?: string;
	labelFontSize?: number;
	valueFontSize?: number;
	withGradient?: boolean;
	anticlockwise?: boolean;
	initialAngularDisplacement?: number;
	backgroundColor?: string;
	textColor?: string;
};

export type LineProps = {
	minValue?: number;
	maxValue?: number;
	selectedValue: number;
	width?: number;
	height?: number;
	strokeWidth?: number;
	activeStrokeColor?: string;
	inactiveStrokeColor?: string;
	backgroundColor?: string;
	textColor?: string;
	label?: string;
	labelFontSize?: number;
	valueFontSize?: number;
	isPercentage?: boolean;
};
