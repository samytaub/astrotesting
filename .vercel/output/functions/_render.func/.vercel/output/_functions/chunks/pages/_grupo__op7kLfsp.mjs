/* empty css                            */
import { A as AstroError, c as InvalidImageService, d as ExpectedImageOptions, E as ExpectedImage, F as FailedToFetchRemoteImageDimensions, e as createComponent, f as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, g as addAttribute, s as spreadAttributes, h as createAstro, i as renderComponent, j as renderHead, k as renderSlot } from '../astro_DYzw0DtZ.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { r as resolveSrc, i as isRemoteImage, a as isESMImportedImage, b as isLocalService, D as DEFAULT_HASH_PROPS } from '../astro/assets-service_QdkxcCwb.mjs';
/* empty css                            */

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + ("0" + i.toString(16)).slice(-2), "");
const readInt16LE = (input, offset = 0) => {
  const val = input[offset] + input[offset + 1] * 2 ** 8;
  return val | (val & 2 ** 15) * 131070;
};
const readUInt16BE = (input, offset = 0) => input[offset] * 2 ** 8 + input[offset + 1];
const readUInt16LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8;
const readUInt24LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16;
const readInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + (input[offset + 3] << 24);
const readUInt32BE = (input, offset = 0) => input[offset] * 2 ** 24 + input[offset + 1] * 2 ** 16 + input[offset + 2] * 2 ** 8 + input[offset + 3];
const readUInt32LE = (input, offset = 0) => input[offset] + input[offset + 1] * 2 ** 8 + input[offset + 2] * 2 ** 16 + input[offset + 3] * 2 ** 24;
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return methods[methodName](input, offset);
}
function readBox(buffer, offset) {
  if (buffer.length - offset < 4)
    return;
  const boxSize = readUInt32BE(buffer, offset);
  if (buffer.length - offset < boxSize)
    return;
  return {
    name: toUTF8String(buffer, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(buffer, boxName, offset) {
  while (offset < buffer.length) {
    const box = readBox(buffer, offset);
    if (!box)
      break;
    if (box.name === boxName)
      return box;
    offset += box.size;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1)
      return imageSize;
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(input, imageIndex));
    }
    return {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0)
      return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  mif1: "heif",
  msf1: "heif",
  // hief-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectBrands(buffer, start, end) {
  let brandsDetected = {};
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(buffer, i, i + 4);
    if (brand in brandMap) {
      brandsDetected[brand] = 1;
    }
  }
  if ("avif" in brandsDetected) {
    return "avif";
  } else if ("heic" in brandsDetected || "heix" in brandsDetected || "hevc" in brandsDetected || "hevx" in brandsDetected) {
    return "heic";
  } else if ("mif1" in brandsDetected || "msf1" in brandsDetected) {
    return "heif";
  }
}
const HEIF = {
  validate(buffer) {
    const ftype = toUTF8String(buffer, 4, 8);
    const brand = toUTF8String(buffer, 8, 12);
    return "ftyp" === ftype && brand in brandMap;
  },
  calculate(buffer) {
    const metaBox = findBox(buffer, "meta", 0);
    const iprpBox = metaBox && findBox(buffer, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(buffer, "ipco", iprpBox.offset + 8);
    const ispeBox = ipcoBox && findBox(buffer, "ispe", ipcoBox.offset + 8);
    if (ispeBox) {
      return {
        height: readUInt32BE(buffer, ispeBox.offset + 16),
        width: readUInt32BE(buffer, ispeBox.offset + 12),
        type: detectBrands(buffer, 8, metaBox.offset)
      };
    }
    throw new TypeError("Invalid HEIF, no size found");
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(input, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength)
      return imageSize;
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < inputLength) {
      imageHeader = readImageHeader(input, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => toHexString(input, 0, 4) === "ff4fff51",
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    if (readUInt32BE(input, 4) !== 1783636e3 || readUInt32BE(input, 0) < 1)
      return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox)
      return false;
    return readUInt32BE(input, ftypBox.offset + 4) === 1718909296;
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(input) {
    input = input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      validateInput(input, i);
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = toUTF8String(input).match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

function readIFD(input, isBigEndian) {
  const ifdOffset = readUInt(input, 32, 4, isBigEndian);
  return input.slice(ifdOffset + 2);
}
function readValue(input, isBigEndian) {
  const low = readUInt(input, 16, 8, isBigEndian);
  const high = readUInt(input, 16, 10, isBigEndian);
  return (high << 16) + low;
}
function nextTag(input) {
  if (input.length > 24) {
    return input.slice(12);
  }
}
function extractTags(input, isBigEndian) {
  const tags = {};
  let temp = input;
  while (temp && temp.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) {
      break;
    } else {
      if (length === 1 && (type === 3 || type === 4)) {
        tags[code] = readValue(temp, isBigEndian);
      }
      temp = nextTag(temp);
    }
  }
  return tags;
}
function determineEndianness(input) {
  const signature = toUTF8String(input, 0, 2);
  if ("II" === signature) {
    return "LE";
  } else if ("MM" === signature) {
    return "BE";
  }
}
const signatures = [
  // '492049', // currently not supported
  "49492a00",
  // Little endian
  "4d4d002a"
  // Big Endian
  // '4d4d002a', // BigTIFF > 4GB. currently not supported
];
const TIFF = {
  validate: (input) => signatures.includes(toHexString(input, 0, 4)),
  calculate(input) {
    const isBigEndian = determineEndianness(input) === "BE";
    const ifdBuffer = readIFD(input, isBigEndian);
    const tags = extractTags(ifdBuffer, isBigEndian);
    const width = tags[256];
    const height = tags[257];
    if (!width || !height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return { height, width };
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(input) {
    const chunkHeader = toUTF8String(input, 12, 16);
    input = input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((fileType) => typeHandlers.get(fileType).validate(input));
}

const globalOptions = {
  disabledTypes: []
};
function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    if (globalOptions.disabledTypes.indexOf(type) > -1) {
      throw new TypeError("disabled file type: " + type);
    }
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function probe(url) {
  const response = await fetch(url);
  if (!response.body || !response.ok) {
    throw new Error("Failed to fetch image");
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done)
      break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = lookup(accumulatedChunks);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch (error) {
      }
    }
  }
  throw new Error("Failed to parse the size");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../astro/assets-service_QdkxcCwb.mjs'
    ).then(n => n.k).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  if (options.inferSize && isRemoteImage(resolvedOptions.src)) {
    try {
      const result = await probe(resolvedOptions.src);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      delete resolvedOptions.inferSize;
    } catch {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(resolvedOptions.src)
      });
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  resolvedOptions.src = clonedSrc;
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => ({
      transform: srcSet.transform,
      url: await service.getURL(srcSet.transform, imageConfig),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }))
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => ({
      transform: srcSet.transform,
      url: globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
      descriptor: srcSet.descriptor,
      attributes: srcSet.attributes
    }));
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$5 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(additionalAttributes)}${spreadAttributes(image.attributes)}>`;
}, "E:/Curso HTML-CSS/pijastr/node_modules/astro/components/Image.astro", void 0);

const $$Astro$4 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute("image/" + image.options.format, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })} <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(imgAdditionalAttributes)}${spreadAttributes(fallbackImage.attributes)}> </picture>`;
}, "E:/Curso HTML-CSS/pijastr/node_modules/astro/components/Picture.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$3 = createAstro();
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "E:/Curso HTML-CSS/pijastr/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Pijamas" } = Astro2.props;
  return renderTemplate`<html lang="en" class="scroll-smooth" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="Tiendas Pijamas" content="Tiendas Pijamas"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, { "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body class="bg-imageBodyBackgrund fixed inset-0" data-astro-cid-sckkx6r4> <!-- <BackGround /> --> <header data-astro-cid-sckkx6r4> <!-- <HeaderBand /> --> <!-- <div>HEADER!!!</div> --> </header> <section data-astro-cid-sckkx6r4> <!-- <WhatsAppIconCall client:load /> --> <!-- <LocationIconCall client:load /> --> </section> <div class="mt-[77px] md:my-[115px]" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </div>  </body> </html>`;
}, "E:/Curso HTML-CSS/pijastr/src/layouts/Layout.astro", void 0);

const $$Astro$1 = createAstro();
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product } = Astro2.props;
  const images = /* #__PURE__ */ Object.assign({"/src/img/productos/B0001.jpg": () => import('../B0001_CN9_fJT4.mjs'),"/src/img/productos/B0080.jpg": () => import('../B0080_D8pGPlM1.mjs'),"/src/img/productos/B0086.jpg": () => import('../B0086_HyPJ5b-h.mjs'),"/src/img/productos/B0087.jpg": () => import('../B0087_BrSU9SIO.mjs'),"/src/img/productos/B0088.jpg": () => import('../B0088_DzSJ_we-.mjs'),"/src/img/productos/B0089.jpg": () => import('../B0089_CemUQ7eL.mjs'),"/src/img/productos/B0090.jpg": () => import('../B0090_D5tmQWMh.mjs'),"/src/img/productos/B0091.jpg": () => import('../B0091_DpSHuH1I.mjs'),"/src/img/productos/B0092.jpg": () => import('../B0092_fnSZI9Ep.mjs'),"/src/img/productos/B0093.jpg": () => import('../B0093_DQELkxMi.mjs'),"/src/img/productos/B0094.jpg": () => import('../B0094_CyBjO9cE.mjs'),"/src/img/productos/B0095.jpg": () => import('../B0095_C3tGPCsR.mjs'),"/src/img/productos/B0097.jpg": () => import('../B0097_CpsQ8mNS.mjs'),"/src/img/productos/B0098.jpg": () => import('../B0098_DRIwaUcs.mjs'),"/src/img/productos/B0299.jpg": () => import('../B0299_S97nGz8m.mjs'),"/src/img/productos/B0300.jpg": () => import('../B0300_CmWy--dm.mjs'),"/src/img/productos/B0301.jpg": () => import('../B0301_C9zxc1vO.mjs'),"/src/img/productos/B0302.jpg": () => import('../B0302_BfXDaOJM.mjs'),"/src/img/productos/B0303.jpg": () => import('../B0303_C3kw2ceZ.mjs'),"/src/img/productos/B0304.jpg": () => import('../B0304_BtakdLPE.mjs'),"/src/img/productos/B0305.jpg": () => import('../B0305_CmaJoBiI.mjs'),"/src/img/productos/B0306.jpg": () => import('../B0306_DNx6qdmA.mjs'),"/src/img/productos/B0307.jpg": () => import('../B0307_CqmGOY1o.mjs'),"/src/img/productos/B0308.jpg": () => import('../B0308_D9SDwWen.mjs'),"/src/img/productos/B0309.jpg": () => import('../B0309_B1hXy_oD.mjs'),"/src/img/productos/C0002.jpg": () => import('../C0002_MBK9Dpy5.mjs'),"/src/img/productos/C0003.jpg": () => import('../C0003_Dkfkd343.mjs'),"/src/img/productos/C0008.jpg": () => import('../C0008_CIeyZgzi.mjs'),"/src/img/productos/C0009.jpg": () => import('../C0009_tjIj4-7K.mjs'),"/src/img/productos/C0010.jpg": () => import('../C0010_DQ2jyYBB.mjs'),"/src/img/productos/C0011.jpg": () => import('../C0011_D4c98ynE.mjs'),"/src/img/productos/C0012.jpg": () => import('../C0012_CoqaF_5W.mjs'),"/src/img/productos/C0013.jpg": () => import('../C0013_DDb3upB9.mjs'),"/src/img/productos/C0014.jpg": () => import('../C0014_CTIfCE9f.mjs'),"/src/img/productos/C0015.jpg": () => import('../C0015_BB85ykL7.mjs'),"/src/img/productos/C0016.jpg": () => import('../C0016_DM04NaBj.mjs'),"/src/img/productos/C0017.jpg": () => import('../C0017_Bn1lY4GD.mjs'),"/src/img/productos/C0018.jpg": () => import('../C0018_BxWLOk-G.mjs'),"/src/img/productos/C0019.jpg": () => import('../C0019_CV6fcJIn.mjs'),"/src/img/productos/D0001.jpg": () => import('../D0001_DKNJRRW_.mjs'),"/src/img/productos/D0049.jpg": () => import('../D0049_CvldSPon.mjs'),"/src/img/productos/D0050.jpg": () => import('../D0050_D3_Pie8S.mjs'),"/src/img/productos/D0061.jpg": () => import('../D0061_FTJ8Px9L.mjs'),"/src/img/productos/D0069.jpg": () => import('../D0069_bxBIoP2Z.mjs'),"/src/img/productos/D0070.jpg": () => import('../D0070_BC7WSNim.mjs'),"/src/img/productos/D0071.jpg": () => import('../D0071_CCIoIexv.mjs'),"/src/img/productos/D0077.jpg": () => import('../D0077_Z97jv9oD.mjs'),"/src/img/productos/D0086.jpg": () => import('../D0086_CPr7WECd.mjs'),"/src/img/productos/D0088.jpg": () => import('../D0088_B0Zr6uhZ.mjs'),"/src/img/productos/D0096.jpg": () => import('../D0096_oB01hczt.mjs'),"/src/img/productos/D0403.jpg": () => import('../D0403_okFWAzxg.mjs'),"/src/img/productos/D0404.jpg": () => import('../D0404_C40VnOip.mjs'),"/src/img/productos/D0405.jpg": () => import('../D0405_Ob_GbmiU.mjs'),"/src/img/productos/D0406.jpg": () => import('../D0406_BqudGopI.mjs'),"/src/img/productos/D0407.jpg": () => import('../D0407_DKXtQeEQ.mjs'),"/src/img/productos/D0408.jpg": () => import('../D0408_BfibyHho.mjs'),"/src/img/productos/D0410.jpg": () => import('../D0410_CLROrQ1B.mjs'),"/src/img/productos/D0411.jpg": () => import('../D0411_BkqyxGqB.mjs'),"/src/img/productos/D0412.jpg": () => import('../D0412_B9XisutT.mjs'),"/src/img/productos/D0413.jpg": () => import('../D0413_D6d3KYbN.mjs'),"/src/img/productos/D0414.jpg": () => import('../D0414_Denoz_mI.mjs'),"/src/img/productos/D0415.jpg": () => import('../D0415_CbkmJdUF.mjs'),"/src/img/productos/D0416.jpg": () => import('../D0416_CNGSzIxz.mjs'),"/src/img/productos/D0417.jpg": () => import('../D0417_Buaxxsd6.mjs'),"/src/img/productos/D0418.jpg": () => import('../D0418_C039VDyP.mjs'),"/src/img/productos/D0419.jpg": () => import('../D0419_uSLbJO3W.mjs'),"/src/img/productos/D0420.jpg": () => import('../D0420_CDAu-Z2v.mjs'),"/src/img/productos/D0421.jpg": () => import('../D0421_BT0BrrMf.mjs'),"/src/img/productos/D0422.jpg": () => import('../D0422_DFruW4XL.mjs'),"/src/img/productos/D0423.jpg": () => import('../D0423_Dnm8G9sD.mjs'),"/src/img/productos/D0424.jpg": () => import('../D0424_CQ17cSYL.mjs'),"/src/img/productos/D0425.jpg": () => import('../D0425_D4qY53Kf.mjs'),"/src/img/productos/D0426.jpg": () => import('../D0426_B-VnEjfR.mjs'),"/src/img/productos/D0429.jpg": () => import('../D0429_F0DAgfAt.mjs'),"/src/img/productos/D0430.jpg": () => import('../D0430_BlV6mC4w.mjs'),"/src/img/productos/D0431.jpg": () => import('../D0431_DAw5_WWv.mjs'),"/src/img/productos/D0432.jpg": () => import('../D0432_C9Fn_JLc.mjs'),"/src/img/productos/D0433.jpg": () => import('../D0433_Ul6uc-Ck.mjs'),"/src/img/productos/D0434.jpg": () => import('../D0434_BARdLGWy.mjs'),"/src/img/productos/D0434precio mal24.jpg": () => import('../D0434precio mal24_BYxoRINB.mjs'),"/src/img/productos/D0435.jpg": () => import('../D0435_DgM11NsJ.mjs'),"/src/img/productos/D0436.jpg": () => import('../D0436_7PueC0d2.mjs'),"/src/img/productos/D0437.jpg": () => import('../D0437_GsxJEiOH.mjs'),"/src/img/productos/D0438.jpg": () => import('../D0438_DgcdMAta.mjs'),"/src/img/productos/D0439.jpg": () => import('../D0439_BlepHuxI.mjs'),"/src/img/productos/D0440.jpg": () => import('../D0440_BYdKMNe5.mjs'),"/src/img/productos/D0441.jpg": () => import('../D0441_BNj52w6P.mjs'),"/src/img/productos/D0442.jpg": () => import('../D0442_DSUXQlDK.mjs'),"/src/img/productos/D0443.jpg": () => import('../D0443_QjT6TCbS.mjs'),"/src/img/productos/D0444.jpg": () => import('../D0444_BYjWnCCz.mjs'),"/src/img/productos/D0445.jpg": () => import('../D0445_BJjBPv-b.mjs'),"/src/img/productos/D0446.jpg": () => import('../D0446_DmGlHp05.mjs'),"/src/img/productos/D0447.jpg": () => import('../D0447_CDesgx49.mjs'),"/src/img/productos/D0448.jpg": () => import('../D0448_VKxTQYHA.mjs'),"/src/img/productos/D0449.jpg": () => import('../D0449_BiXVzb6o.mjs'),"/src/img/productos/D0450.jpg": () => import('../D0450_BXRtkTVy.mjs'),"/src/img/productos/D0451.jpg": () => import('../D0451_DOnQ-xRj.mjs'),"/src/img/productos/D0452.jpg": () => import('../D0452_BAtYcJBd.mjs'),"/src/img/productos/D0453.jpg": () => import('../D0453_DWId92oq.mjs'),"/src/img/productos/D0454.jpg": () => import('../D0454_DPKjxY9p.mjs'),"/src/img/productos/D0455.jpg": () => import('../D0455_Co3WZK7N.mjs'),"/src/img/productos/D0456.jpg": () => import('../D0456_CHYE8Cnu.mjs'),"/src/img/productos/D0457.jpg": () => import('../D0457_GFLEjwkA.mjs'),"/src/img/productos/D0458.jpg": () => import('../D0458_BXQlqphO.mjs'),"/src/img/productos/N0054.jpg": () => import('../N0054_B9HooOcP.mjs'),"/src/img/productos/N0060.jpg": () => import('../N0060_DGHjk7qa.mjs'),"/src/img/productos/N0061.jpg": () => import('../N0061_EOVzVNPf.mjs'),"/src/img/productos/N0064.jpg": () => import('../N0064_hiP8DvII.mjs'),"/src/img/productos/N0065.jpg": () => import('../N0065_DYBoHAF6.mjs'),"/src/img/productos/N0066.jpg": () => import('../N0066_DSnMg83X.mjs'),"/src/img/productos/N0067.jpg": () => import('../N0067_KZjaYKBP.mjs'),"/src/img/productos/N0070.jpg": () => import('../N0070_Bmnvh-_W.mjs'),"/src/img/productos/N0071.jpg": () => import('../N0071_BsOkfou2.mjs'),"/src/img/productos/N0073.jpg": () => import('../N0073_B-MPV7yV.mjs'),"/src/img/productos/N0074.jpg": () => import('../N0074_C68bkqal.mjs'),"/src/img/productos/N0075.jpg": () => import('../N0075_Cc6GCYfe.mjs'),"/src/img/productos/N0076.jpg": () => import('../N0076_B9lM6vKi.mjs'),"/src/img/productos/N0077.jpg": () => import('../N0077_CiuWh1xM.mjs'),"/src/img/productos/N0078.jpg": () => import('../N0078_p3zOzVx4.mjs'),"/src/img/productos/NV0018.jpg": () => import('../NV0018_DWxs-Wbi.mjs'),"/src/img/productos/NV0019.jpg": () => import('../NV0019_CNlcNefu.mjs'),"/src/img/productos/NV0020.jpg": () => import('../NV0020_BLR_zTRR.mjs'),"/src/img/productos/NV0021.jpg": () => import('../NV0021_CLkDtmcs.mjs'),"/src/img/productos/NV0022.jpg": () => import('../NV0022_RIawyUMs.mjs'),"/src/img/productos/NV0023.jpg": () => import('../NV0023_BPfEF1Lg.mjs'),"/src/img/productos/NV0030.jpg": () => import('../NV0030_S6Hpecxo.mjs'),"/src/img/productos/NV0030PLUS.jpg": () => import('../NV0030PLUS_D2PpEMc3.mjs'),"/src/img/productos/NV0031.jpg": () => import('../NV0031_y3OKRv1-.mjs'),"/src/img/productos/NV0032.jpg": () => import('../NV0032_C2aS-y7X.mjs'),"/src/img/productos/NV0033.jpg": () => import('../NV0033_C-6fV5dO.mjs'),"/src/img/productos/NV0035.jpg": () => import('../NV0035_CV_Wretp.mjs'),"/src/img/productos/NV0036.jpg": () => import('../NV0036_BIPUq3kQ.mjs'),"/src/img/productos/NV0036PLUS.jpg": () => import('../NV0036PLUS_CjWfnYfy.mjs'),"/src/img/productos/NV0037.jpg": () => import('../NV0037_DJdvBS8-.mjs'),"/src/img/productos/NV0038.jpg": () => import('../NV0038_C3rLq2ll.mjs'),"/src/img/productos/NV0039.jpg": () => import('../NV0039_DsCGbXhx.mjs'),"/src/img/productos/NV0041.jpg": () => import('../NV0041_BW7KXisF.mjs'),"/src/img/productos/O-B0086.jpg": () => import('../O-B0086_UkSfKfv0.mjs'),"/src/img/productos/O-B0087.jpg": () => import('../O-B0087_DsHuzR6p.mjs'),"/src/img/productos/O-B0088.jpg": () => import('../O-B0088_Cx2u6TCC.mjs'),"/src/img/productos/O-B0089.jpg": () => import('../O-B0089_DJasG7DT.mjs'),"/src/img/productos/O-B0090.jpg": () => import('../O-B0090_DyVy9NEN.mjs'),"/src/img/productos/O-B0091.jpg": () => import('../O-B0091_B0Hd289Y.mjs'),"/src/img/productos/O-B0092.jpg": () => import('../O-B0092_Dv7-i1Wb.mjs'),"/src/img/productos/O-B0093.jpg": () => import('../O-B0093_Bcvws6c-.mjs'),"/src/img/productos/O-B0094.jpg": () => import('../O-B0094_15ogrOAM.mjs'),"/src/img/productos/O-B0095.jpg": () => import('../O-B0095_TJZe_MNf.mjs'),"/src/img/productos/O-B0097.jpg": () => import('../O-B0097_DvkoLDiI.mjs'),"/src/img/productos/O-B0098.jpg": () => import('../O-B0098_B9X1PuDj.mjs'),"/src/img/productos/O-C0010.jpg": () => import('../O-C0010_C1rb3FUI.mjs'),"/src/img/productos/O-D0074.jpg": () => import('../O-D0074_DRA_c0kQ.mjs'),"/src/img/productos/O-D0086.jpg": () => import('../O-D0086_kLi4n7Hu.mjs'),"/src/img/productos/O-D0403.jpg": () => import('../O-D0403_B_4cG8gF.mjs'),"/src/img/productos/O-D0406.jpg": () => import('../O-D0406_AleP0nxy.mjs'),"/src/img/productos/O-N0006.jpg": () => import('../O-N0006_MISKOmhG.mjs'),"/src/img/productos/O-N0054.jpg": () => import('../O-N0054_DrcgyCA_.mjs'),"/src/img/productos/O-N0060.jpg": () => import('../O-N0060_At0ZTTVN.mjs'),"/src/img/productos/O-N0061.jpg": () => import('../O-N0061_W1laRE_B.mjs'),"/src/img/productos/O-N0064.jpg": () => import('../O-N0064_CZ51rFd_.mjs'),"/src/img/productos/O-V0001.jpg": () => import('../O-V0001_dnVYAHgp.mjs'),"/src/img/productos/O-V0059.jpg": () => import('../O-V0059_Cv8XmXn0.mjs'),"/src/img/productos/P0074.jpg": () => import('../P0074_I7o4k4QB.mjs'),"/src/img/productos/P0075.jpg": () => import('../P0075_DtxJlHkH.mjs'),"/src/img/productos/P0076.jpg": () => import('../P0076_Bqifu6V1.mjs'),"/src/img/productos/P0077.jpg": () => import('../P0077_DhYo7Smv.mjs'),"/src/img/productos/P0078.jpg": () => import('../P0078_BZK6DlwN.mjs'),"/src/img/productos/P288.jpg": () => import('../P288_CkA3OJBl.mjs'),"/src/img/productos/P391.jpg": () => import('../P391_fRmOVJ1t.mjs'),"/src/img/productos/P458.jpg": () => import('../P458_BOUD9C92.mjs'),"/src/img/productos/P459.jpg": () => import('../P459__LomfQ4G.mjs'),"/src/img/productos/P460.jpg": () => import('../P460_hqSE5A1j.mjs'),"/src/img/productos/P655.jpg": () => import('../P655_CGZat7Ch.mjs'),"/src/img/productos/P656.jpg": () => import('../P656_Bvl-G6pG.mjs'),"/src/img/productos/P657.jpg": () => import('../P657_D9QOlFva.mjs'),"/src/img/productos/P658.jpg": () => import('../P658_EbJOBMs2.mjs'),"/src/img/productos/PORTADA_DAMA CAPRI.jpg": () => import('../PORTADA_DAMA CAPRI_Y07KwSNG.mjs'),"/src/img/productos/V0001.jpg": () => import('../V0001_Bjc8UzjE.mjs'),"/src/img/productos/V0003.jpg": () => import('../V0003_CHhLo65j.mjs'),"/src/img/productos/V0055.jpg": () => import('../V0055_H-jru16f.mjs'),"/src/img/productos/V0056.jpg": () => import('../V0056_DTN7MLEE.mjs'),"/src/img/productos/V0059.jpg": () => import('../V0059_CNx1rtBH.mjs'),"/src/img/productos/V0068.jpg": () => import('../V0068_DyzerbZw.mjs'),"/src/img/productos/V0069.jpg": () => import('../V0069_BVvaJzJz.mjs'),"/src/img/productos/V0072.jpg": () => import('../V0072_CzmWKmzC.mjs'),"/src/img/productos/V0079.jpg": () => import('../V0079_BHK_RiQ5.mjs'),"/src/img/productos/V0080.jpg": () => import('../V0080_CC8l4NNE.mjs'),"/src/img/productos/malaNV0020.jpg": () => import('../malaNV0020_Cuvp8bXs.mjs')

});
  console.log("\xCFmages array", images);
  const direccion = `/src/img/productos/${product.ref}.jpg`;
  console.log("Direccion---", direccion);
  return renderTemplate`${maybeRenderHead()}<div class="tarjeta" data-astro-cid-tjdfhdqb> ${renderComponent($$result, "Image", $$Image, { "id": "fotoProducto", "class": "w-full rounded-[12px]", "src": images[direccion](), "alt": product.ref, "data-astro-cid-tjdfhdqb": true })} <div class="precio text-fondoOferta"${addAttribute(`bottom: ${product.preY}% ;  left: ${product.preX}%`, "style")} id="precio" data-astro-cid-tjdfhdqb> <span data-astro-cid-tjdfhdqb>$</span>${product.pre} </div> <div class="oferta"${addAttribute(`left:${product.ofeX}%; bottom:${product.ofeY}%; 
        backgroundColor:${product.ofeColor}; 
        outline: 1px dashed ${product.ofeColor}; 
        visibility: ${product.preOfe ? "visible" : "hidden"};`, "style")} id="oferta" data-astro-cid-tjdfhdqb> <div class="titulo-oferta" data-astro-cid-tjdfhdqb>Oferta</div> <div class="precio-oferta" data-astro-cid-tjdfhdqb><span data-astro-cid-tjdfhdqb>$</span>${product.preOfe}</div> </div> <div class="informativo"${addAttribute(`left:${product.infX}%; bottom:${product.infY}%;   visibility: ${product.il1 || product.il2 || product.il3 ? "visible" : "hidden"};`, "style")} id="informativo" data-astro-cid-tjdfhdqb> <div class="titulo-inf" id="I1" data-astro-cid-tjdfhdqb> ${product.il1 === void 0 ? " " : product.il1} </div> <div class="titulo-inf" id="I2" data-astro-cid-tjdfhdqb> ${product.il2 === void 0 ? " " : product.il2} </div> <div class="titulo-inf_bold" id="I3" data-astro-cid-tjdfhdqb> ${product.il3 === void 0 ? " " : product.il3} </div> </div> </div> `;
}, "E:/Curso HTML-CSS/pijastr/src/components/ProductCard.astro", void 0);

var productosactivosLocal = [["C0018", "CABALLEROS", "PANTALON", "34", "TRUE", "63", "22", "", "", "", "", "Tallas", "2XL 3XL", "$ 41"], ["C0017", "CABALLEROS", "PANTALON", "36", "TRUE", "63", "22", "", "", "", "", "Tallas", "2XL 3XL", "$ 43"], ["C0012", "CABALLEROS", "PANTALON", "33", "TRUE", "63", "22"], ["C0008", "CABALLEROS", "PANTALON", "32", "TRUE", "63", "22", "", "", "", "", "Tallas", "2XL 3XL", "$ 39", "54", "75"], ["C0019", "CABALLEROS", "SHORT", "29", "TRUE", "63", "22", "", "", "", "", "Tallas", "2XL 3XL", "$ 34"], ["C0016", "CABALLEROS", "SHORT", "27", "TRUE", "63", "22", "", "", "", "", "Tallas", "2XL 3XL", "$ 34"], ["C0014", "CABALLEROS", "SHORT", "25", "TRUE", "63", "22"], ["C0013", "CABALLEROS", "SHORT", "25", "TRUE", "63", "22", "15"], ["C0009", "CABALLEROS", "SHORT", "28", "TRUE", "63", "22", "18", "", "", "", "Tallas", "2XL 3XL", "18"], ["D0452", "DAMAS", "DORMILONAS", "22", "TRUE", "57", "15"], ["D0453", "DAMAS", "DORMILONAS", "29", "TRUE", "57", "15"], ["D0442", "DAMAS", "DORMILONAS", "22", "TRUE", "59", "47", "16", "60", "60"], ["D0443", "DAMAS", "DORMILONAS", "24", "TRUE", "59", "47"], ["D0444", "DAMAS", "DORMILONAS", "22", "TRUE", "59", "47", "16", "60", "60"], ["D0437", "DAMAS", "DORMILONAS", "19", "TRUE", "63", "18", "16"], ["D0438", "DAMAS", "DORMILONAS", "21", "TRUE", "63", "18", "16"], ["D0435", "DAMAS", "DORMILONAS", "23", "TRUE", "63", "18", "16"], ["D0431", "DAMAS", "DORMILONAS", "26", "TRUE", "63", "18", "16"], ["D0430", "DAMAS", "DORMILONAS", "23", "TRUE", "63", "18", "16"], ["D0429", "DAMAS", "DORMILONAS", "23", "TRUE", "63", "18", "16"], ["D0421", "DAMAS", "DORMILONAS", "24", "TRUE", "63", "18"], ["D0419", "DAMAS", "DORMILONAS", "25", "TRUE", "63", "18", "16"], ["D0414", "DAMAS", "DORMILONAS", "24", "TRUE", "63", "18", "", "", "", "", "Tallas", "2XL 3XL", "$ 29", "43", "18", "crimson"], ["D0454", "DAMAS", "SHORT", "27", "TRUE", "57", "15"], ["D0451", "DAMAS", "SHORT", "27", "TRUE", "63", "18"], ["D0445", "DAMAS", "SHORT", "23", "TRUE", "59", "47", "16"], ["D0446", "DAMAS", "SHORT", "25", "TRUE", "59", "47", "16"], ["D0434", "DAMAS", "SHORT", "25", "TRUE", "63", "18", "16"], ["D0432", "DAMAS", "SHORT", "24", "TRUE", "63", "18", "16"], ["D0424", "DAMAS", "SHORT", "23", "TRUE", "63", "18", "16"], ["D0422", "DAMAS", "SHORT", "25", "TRUE", "63", "18"], ["D0416", "DAMAS", "SHORT", "26", "FALSE", "63", "18"], ["D0415", "DAMAS", "SHORT", "25", "TRUE", "63", "18"], ["D0413", "DAMAS", "SHORT", "25", "TRUE", "63", "22", "16"], ["D0458", "DAMAS", "CAPRI", "30", "TRUE", "57", "15", "25"], ["D0447", "DAMAS", "CAPRI", "27", "TRUE", "59", "47", "19"], ["D0449", "DAMAS", "CAPRI", "29", "TRUE", "59", "47", "19"], ["D0436", "DAMAS", "CAPRI", "29", "TRUE", "63", "18", "16"], ["D0425", "DAMAS", "CAPRI", "28", "FALSE", "63", "18"], ["D0423", "DAMAS", "CAPRI", "29", "TRUE", "63", "18"], ["D0404", "DAMAS", "CAPRI", "28", "FALSE", "63", "18"], ["D0061", "DAMAS", "CAPRI", "27", "TRUE", "63", "18", "19"], ["D0455", "DAMAS", "PANTALON", "31", "TRUE", "57", "15", "25"], ["D0456", "DAMAS", "PANTALON", "33", "TRUE", "57", "15"], ["D0457", "DAMAS", "PANTALON", "31", "TRUE", "57", "15", "25"], ["D0448", "DAMAS", "PANTALON", "33", "TRUE", "63", "47", "19"], ["D0450", "DAMAS", "PANTALON", "34", "TRUE", "63", "47"], ["D0440", "DAMAS", "PANTALON", "32", "FALSE", "63", "18"], ["D0439", "DAMAS", "PANTALON", "29", "FALSE", "63", "18"], ["D0433", "DAMAS", "PANTALON", "32", "FALSE", "63", "18"], ["D0426", "DAMAS", "PANTALON", "32", "TRUE", "63", "18", "19"], ["D0420", "DAMAS", "PANTALON", "32", "FALSE", "63", "18"], ["D0412", "DAMAS", "PANTALON", "33", "TRUE", "63", "18"], ["D0411", "DAMAS", "PANTALON", "35", "TRUE", "63", "18"], ["D0414", "DAMAS", "LEVANTADORAS", "24", "TRUE", "63", "18", "", "", "", "", "Tallas", "2XL 3XL", "$ 29", "43", "18", "crimson"], ["D0441", "DAMAS", "LEVANTADORAS", "37", "TRUE", "63", "18"], ["D0069", "DAMAS", "BRAGAS", "23", "TRUE", "63", "18", "16"], ["D0001", "DAMAS", "BRAGAS", "20", "TRUE", "63", "18", "16"], ["P0078", "DAMAS", "TALLAS GRANDES", "32", "TRUE", "63", "18"], ["P0077", "DAMAS", "TALLAS GRANDES", "28", "TRUE", "63", "18"], ["P0076", "DAMAS", "TALLAS GRANDES", "38", "TRUE", "63", "18"], ["P0075", "DAMAS", "TALLAS GRANDES", "34", "TRUE", "63", "18"], ["P0074", "DAMAS", "TALLAS GRANDES", "29", "TRUE", "63", "18"], ["C0011", "CABALLEROS", "SUELTAS", "22", "TRUE", "65", "26", "", "", "", "", "Tallas", "2XL 3XL", "$ 22", "50", "75"], ["C0015", "CABALLEROS", "SUELTAS", "20", "TRUE", "63", "22", "", "", "", "", "Pack", "2", "Boxer", "50", "72"], ["V0080", "NIÑOS", "UNICA", "28", "TRUE", "63", "21"], ["V0079", "NIÑOS", "UNICA", "23", "TRUE", "63", "21"], ["V0072", "NIÑOS", "UNICA", "21", "TRUE", "63", "20"], ["V0069", "NIÑOS", "UNICA", "21", "TRUE", "63", "21"], ["V0068", "NIÑOS", "UNICA", "27", "TRUE", "63", "20"], ["V0059", "NIÑOS", "UNICA", "18", "TRUE", "63", "25", "10"], ["V0056", "NIÑOS", "UNICA", "21", "TRUE", "63", "20", "16"], ["V0055", "NIÑOS", "UNICA", "26", "TRUE", "63", "25", "16"], ["V0003", "NIÑOS", "UNICA", "28", "TRUE", "63", "25", "16"], ["V0001", "NIÑOS", "UNICA", "21", "TRUE", "63", "25", "10"], ["N0078", "NIÑAS", "UNICA", "29", "TRUE", "63", "18", "18"], ["N0077", "NIÑAS", "UNICA", "25", "TRUE", "63", "18", "18"], ["N0076", "NIÑAS", "UNICA", "23", "TRUE", "63", "18", "15"], ["N0075", "NIÑAS", "UNICA", "23", "TRUE", "63", "18", "15"], ["N0074", "NIÑAS", "UNICA", "21", "TRUE", "63", "18", "15"], ["N0073", "NIÑAS", "UNICA", "28", "TRUE", "63", "18", "18"], ["N0071", "NIÑAS", "UNICA", "21", "TRUE", "63", "20", "15"], ["N0070", "NIÑAS", "UNICA", "21", "TRUE", "63", "21"], ["N0067", "NIÑAS", "UNICA", "27", "TRUE", "63", "20"], ["N0066", "NIÑAS", "UNICA", "20", "TRUE", "63", "21", "10"], ["N0061", "NIÑAS", "UNICA", "18", "TRUE", "63", "25", "10"], ["N0060", "NIÑAS", "UNICA", "20", "TRUE", "63", "18", "10"], ["N0054", "NIÑAS", "UNICA", "18", "TRUE", "63", "25", "10"], ["B0306", "BEBE", "VARON", "10", "TRUE", "63", "18"], ["B0307", "BEBE", "VARON", "10", "TRUE", "63", "18"], ["B0001", "BEBE", "VARON", "10", "TRUE", "63", "18"], ["B0303", "BEBE", "VARON", "10", "TRUE", "63", "18"], ["B0301", "BEBE", "VARON", "11", "TRUE", "45", "20"], ["B0299", "BEBE", "VARON", "13", "TRUE", "45", "20"], ["B0080", "BEBE", "VARON", "12", "TRUE", "63", "8", "5"], ["O-B0086", "BEBE", "VARON", "17", "TRUE", "63", "8", "5"], ["O-B0087", "BEBE", "VARON", "16", "TRUE", "63", "8", "5"], ["B0308", "BEBE", "HEMBRA", "10", "TRUE", "63", "18"], ["B0309", "BEBE", "HEMBRA", "10", "TRUE", "63", "18"], ["B0304", "BEBE", "HEMBRA", "10", "TRUE", "63", "18"], ["B0305", "BEBE", "HEMBRA", "10", "TRUE", "63", "18"], ["B0302", "BEBE", "HEMBRA", "12", "TRUE", "63", "9"], ["B0300", "BEBE", "HEMBRA", "13", "TRUE", "63", "9"], ["B0092", "BEBE", "HEMBRA", "13", "TRUE", "63", "8", "5"], ["O-B0094", "BEBE", "HEMBRA", "13", "TRUE", "63", "8", "5"], ["P391", "PANTUFLAS", "UNICA", "26", "TRUE", "67", "15"], ["P658", "PANTUFLAS", "UNICA", "29", "TRUE", "67", "15"], ["P288", "PANTUFLAS", "UNICA", "29", "TRUE", "67", "15"], ["P458", "PANTUFLAS", "UNICA", "26", "TRUE", "67", "15"], ["P459", "PANTUFLAS", "UNICA", "26", "TRUE", "67", "15"], ["P460", "PANTUFLAS", "UNICA", "26", "TRUE", "67", "15"], ["P655", "PANTUFLAS", "UNICA", "29", "TRUE", "67", "15"], ["P656", "PANTUFLAS", "UNICA", "29", "TRUE", "67", "15"], ["P657", "PANTUFLAS", "UNICA", "29", "TRUE", "67", "15"], ["D0412", "FAMILIAR1", "UNICA", "33", "TRUE", "63", "18"], ["C0012", "FAMILIAR1", "UNICA", "33", "TRUE", "63", "18"], ["N0067", "FAMILIAR1", "UNICA", "27", "TRUE", "63", "19"], ["V0068", "FAMILIAR1", "UNICA", "27", "TRUE", "63", "19"], ["B0299", "FAMILIAR1", "UNICA", "13", "TRUE", "63", "10"], ["B0300", "FAMILIAR1", "UNICA", "16", "TRUE", "63", "11", "13"], ["D0413", "FAMILIAR2", "UNICA", "25", "TRUE", "63", "21", "16"], ["C0013", "FAMILIAR2", "UNICA", "25", "TRUE", "63", "21"], ["N0070", "FAMILIAR2", "UNICA", "21", "TRUE", "63", "21"], ["V0069", "FAMILIAR2", "UNICA", "21", "TRUE", "63", "21"], ["B0302", "FAMILIAR2", "UNICA", "16", "TRUE", "63", "10", "12"], ["B0301", "FAMILIAR2", "UNICA", "11", "TRUE", "45", "20"], ["D0415", "FAMILIAR3", "UNICA", "25", "TRUE", "63", "18"], ["C0014", "FAMILIAR3", "UNICA", "25", "TRUE", "63", "18"], ["N0071", "FAMILIAR3", "UNICA", "21", "TRUE", "63", "20", "15"], ["V0072", "FAMILIAR3", "UNICA", "21", "TRUE", "63", "20"], ["B0092", "BEBEOFERTA", "UNICA", "13", "TRUE", "63", "8", "5"], ["O-B0094", "BEBEOFERTA", "UNICA", "13", "TRUE", "63", "8", "5"], ["O-B0086", "BEBEOFERTA", "UNICA", "17", "TRUE", "63", "8", "5"], ["O-B0087", "BEBEOFERTA", "UNICA", "16", "TRUE", "63", "8", "5"], ["O-N0006", "NINAOFERTA", "UNICA", "16", "FALSE", "63", "14", "10"], ["O-N0054", "NINAOFERTA", "UNICA", "18", "TRUE", "63", "14", "10"], ["O-N0060", "NINAOFERTA", "UNICA", "20", "TRUE", "63", "14", "10"], ["O-N0061", "NINAOFERTA", "UNICA", "15", "TRUE", "63", "14", "10"], ["O-V0001", "NINOOFERTA", "UNICA", "21", "TRUE", "63", "14", "10"], ["O-V0059", "NINOOFERTA", "UNICA", "18", "TRUE", "63", "14", "10"], ["O-D0074", "DAMAS", "DORMILONAS", "16", "TRUE", "63", "14", "10"], ["D0442", "DAMAS", "MADRE", "22", "TRUE", "59", "50"], ["D0443", "DAMAS", "MADRE", "24", "TRUE", "59", "50"], ["D0444", "DAMAS", "MADRE", "22", "TRUE", "59", "50"], ["D0445", "DAMAS", "MADRE", "23", "TRUE", "59", "50"], ["D0446", "DAMAS", "MADRE", "25", "TRUE", "59", "50"], ["D0447", "DAMAS", "MADRE", "27", "TRUE", "59", "50"], ["D0448", "DAMAS", "MADRE", "33", "TRUE", "59", "50"], ["D0449", "DAMAS", "MADRE", "29", "TRUE", "59", "50"], ["D0450", "DAMAS", "MADRE", "34", "TRUE", "59", "50"], ["NV0030", "NAVIDAD", "UNICA", "28", "FALSE", "47", "10", "", "", "", "", "Tallas", "2XL 3XL", "$ 31", "74", "5", "GREEN"], ["NV0031", "NAVIDAD", "UNICA", "28", "FALSE", "47", "10", "", "", "", "", "Tallas", "2XL 3XL", "$ 31", "74", "5", "GREEN"], ["NV0032", "NAVIDAD", "UNICA", "24", "FALSE", "35", "10"], ["NV0033", "NAVIDAD", "UNICA", "19", "FALSE", "59", "10"], ["NV0034", "NAVIDAD", "UNICA", "17", "FALSE", "59", "10"], ["NV0035", "NAVIDAD", "UNICA", "14", "FALSE", "35", "10"], ["NV0036", "NAVIDAD", "UNICA", "28", "FALSE", "47", "10", "", "", "", "", "Tallas", "2XL 3XL", "$ 31", "74", "5", "GREEN"], ["NV0037", "NAVIDAD", "UNICA", "28", "FALSE", "47", "10", "", "", "", "", "Tallas", "2XL 3XL", "$ 31", "74", "5", "GREEN"], ["NV0038", "NAVIDAD", "UNICA", "24", "FALSE", "35", "10"], ["NV0039", "NAVIDAD", "UNICA", "19", "FALSE", "59", "10"], ["NV0040", "NAVIDAD", "UNICA", "17", "FALSE", "59", "10"], ["NV0041", "NAVIDAD", "UNICA", "14", "FALSE", "35", "10"]];

var productosactivos = null;


var dataFetch = async function (dataBase) {
    try {
        console.log("Estoy en dataFetch voy a probar con esta BD --->", dataBase);
        const resp = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${dataBase}/values/a2:Q?key=AIzaSyAify4p5Tati7XcBqiJT6XIQGSHXMPePMc`
        );

        // A veces el API funciona pero igual no trae la data, por eso hago el chequeo adicional si volvio OK
        if (!resp.ok) throw new Error("dataFetch2: Problema con Fetch de DATOS ");

        const data = await resp.json();

        console.log(
            "Base de Datos en uso ---> ",
            dataBase.substring(30).slice(-10)
        );

        return data.values;

    } catch (error) {
        console.error(error);
        console.log(
            "Sigue la ejecucion con BD Local dentro de Config -- BD operacional no pudo ser accesada"
        );
        // Toma la BAse de datos alterna (local)  es un array que está en el archivo CONFIG.JS
        return productosactivosLocal;
    }
};

// Va al Google Sheets CONFIG y busca el nombre de la base de datos (Archivo GoogleSheets)
const generateDB = (async function (dbTest = 'default') {
    try {
        // Busca en CONFIG el arhivo Sheets donde está la data (nombre del archivo), luego llama la rutina que hasce el Fetch de la data
        //
        var respuesta = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/1vSAQAKOPNKdduTi4p9T3Dga6cPDPsJqyryi739Tx8jk/values/a1:b?key=AIzaSyAify4p5Tati7XcBqiJT6XIQGSHXMPePMc`
        );
        var resjson = await respuesta.json();
        var configData = await resjson.values;
        // convierte los datos de CONFIG en un Objeto
        var config = Object.fromEntries(configData);
        // console.log("CONFIG DATA ES ", config);

        // Asigna el nombre de Base de Datos que trae de CONFIG como base de Datos a Usar
        var dataBase = config.bd;
        //En caso que el llamado de la pagina WEB traiga el parametro ?bd=stringdebaseddedatosgoogle fuerza el cambio para usar esa BD
        dbTest != "default" ? dataBase = dbTest : "";

        //Llamada para que lea la  Data
        productosactivos = await dataFetch(dataBase); //OJO PONER dataBase COMO PARAMETRO <<<<<<<<<<<<<<<<<<<<<<<<<<<<s

        // console.log("Base de datos Pijamas", productosactivos);
        // Solicita el despliegue de algun grupo subgrupo  si es que estan el los queryparams
        // if (grupo && subgrupo) {
        //     // console.log(`>>>>>>>  despliegaTarjetas(${parametrosObj.grupo},${parametrosObj.subgrupo})`)
        //     // despliegaTarjetas(parametrosObj.grupo, parametrosObj.subgrupo, true, parametrosObj.soloOferta || false);
        //     console.log("Tome los queryparams Grupo y Subgrupo");
        // }
    } catch (error) {
        console.log(
            "Sigue la ejecucion con BD respaldo dentro del CODIGO -- Error en fetch de la REFERENCIA a la BD Google"
        );

        productosactivos = productosactivosLocal;
        // console.log("Base de datos Pijamas que viene de LOCAL", productosactivos);
        //  if (parametrosObj.grupo && parametrosObj.subgrupo) {
        //   despliegaTarjetas(
        //     parametrosObj.grupo,
        //     parametrosObj.subgrupo,
        //     true,
        //     parametrosObj.soloOferta || false
        //   );
        //  }
    }

    // console.log("Base de Datos para trabajar --->", productosactivos);
});

const $$Astro = createAstro();
const $$grupo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$grupo;
  !productosactivos ? await generateDB() : console.log("No se requiere bajar la Base de Datos");
  const { rubro, grupo } = Astro2.params;
  const queryParams = Object.fromEntries(Astro2.url.searchParams.entries());
  console.log("Query Params====> ", queryParams);
  var displayProducts = productosactivos.filter(
    (producto) => rubro.toUpperCase() === producto[1] && grupo.toUpperCase() === producto[2]
  ).filter(
    (producto) => queryParams?.oferta === "true" ? producto[7] ? true : false : true
  ).map((producto) => {
    const keys = [
      "ref",
      "gru",
      "subg",
      "pre",
      "act",
      "preX",
      "preY",
      "preOfe",
      "ofeX",
      "ofeY",
      "ofeColor",
      "il1",
      "il2",
      "il3",
      "infX",
      "infY",
      "infColor"
    ];
    const productObj = keys.reduce((obj, key, index) => {
      obj[key] = producto[index];
      return obj;
    }, {});
    return productObj;
  });
  return renderTemplate`<!-- ---
import Layout from "../../../layouts/Layout.astro";
const { rubro, grupo } = Astro.params;
---

<Layout title="Tiendas Pijamas">
  <div
    class="text-moradobasicoOscuro w-full h-screen flex justify-center items-center font-bold text-2xl"
  >
    MODELOS DE DAMAS {rubro}
    {grupo}...
  </div>
</Layout>
 -->${renderComponent($$result, "Layout", $$Layout, { "title": "Tiendas Pijamas" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="p-4
          md:px-24
          pb-32
          w-full
          h-lvh
          grid
          grid-cols-2
          md:grid-cols-4
          gap-2 md:gap-6
          overflow-scroll
          justify-start
          items-start
          text-sm
          object-contain"> ${displayProducts.map((product) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "className": "self-start", "product": product })}`)} </div> ` })}`;
}, "E:/Curso HTML-CSS/pijastr/src/pages/display/[rubro]/[grupo].astro", void 0);

const $$file = "E:/Curso HTML-CSS/pijastr/src/pages/display/[rubro]/[grupo].astro";
const $$url = "/display/[rubro]/[grupo]";

const _grupo_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$grupo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$ProductCard as $, _grupo_ as _, $$Layout as a, getConfiguredImageService as b, generateDB as g, imageConfig as i, productosactivos as p };
