export function getTextColor(primaryColor) {
  const red = parseInt(primaryColor.slice(1, 3), 16);
  const green = parseInt(primaryColor.slice(3, 5), 16);
  const blue = parseInt(primaryColor.slice(5), 16);
  // calculate brightness coefficient
  const brightness = (red * 299 + green * 587 + blue * 114) / 255000;

  // if brightness is greater than 0.5, it should be bright enough for dark text
  if (brightness <= 0.5) {
    return '#fff';
  } else {
    return '#000';
  }
}
