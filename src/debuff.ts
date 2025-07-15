const debuffs = [
	"No Jumping",
	"Swap your Primary and Secondary keybinds",
	"No Ult",
	"Increase your sensitivity by 20",
	"Overwatch one default skin",
];

export const getDebuff = () => {
	const index = Math.floor(Math.random() * debuffs.length);
	if (!debuffs[index]) throw new Error("debuff index failed");

	return debuffs[index];
};
