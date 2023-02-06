export function RGB2Hex(color) {
  const rgb = color.split(",");
  const r = parseInt(rgb[0]);
  const g = parseInt(rgb[1]);
  const b = parseInt(rgb[2]);

  const hex = ((r << 16) + (g << 8) + b).toString(16);
  return hex === "NaN" ? "??????" : "#" + hex;
}
// console.log(colorRGB2Hex("255,255,255"))

export function hexToRgba(hex, opacity = 1) {
  hex = hex.trim();
  if (hex.length > 7 || !hex.length) return false;
  // 如果是简写的
  if (hex.length === 3) {
    hex =
      hex.slice(0).repeat(2) + hex.slice(1).repeat(2) + hex.slice(2).repeat(2);
  }
  if (!hex.match(/#/)) {
    hex = "#" + hex;
  }
  const r = parseInt("0x" + hex.slice(1, 3)) || "???";
  const g = parseInt("0x" + hex.slice(3, 5)) || "???";
  const b = parseInt("0x" + hex.slice(5, 7)) || "???";

  return {
    r,
    g,
    b,
    rgba: "rgba(" + r + "," + g + "," + b + "," + opacity + ")",
  };
}
// console.log(hexToRgba("#cccccc", 1));
