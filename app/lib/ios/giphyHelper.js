import {NSArray} from "Foundation";
import {GiphyCore, GiphyCoreSDK, GPHMedia} from "GiphyCoreSDK";
const apiKey = 'api_key';
const Rating = {
  'Y' : GiphyCoreSDK.GPHRatingTypeRatedY,
  'G' : GiphyCoreSDK.GPHRatingTypeRatedG,
  'PG' : GiphyCoreSDK.GPHRatingTypeRatedPG,
  'PG13' : GiphyCoreSDK.GPHRatingTypeRatedPG13,
  'R' : GiphyCoreSDK.GPHRatingTypeRatedR,
  'NsFw' : GiphyCoreSDK.GPHRatingTypeNsfw,
  'UNRATED' : GiphyCoreSDK.GPHRatingTypeUnrated
};
const MediaType = {
  'GIF' : GiphyCoreSDK.GPHMediaTypeGif,
  'STICKER' : GiphyCoreSDK.GPHMediaTypeSticker
};
const RenditionType = {
  'Original' : GiphyCoreSDK.GPHRenditionTypeOriginal,
  'OriginalStill' : GiphyCoreSDK.GPHRenditionTypeOriginalStill,
  'Preview' : GiphyCoreSDK.GPHRenditionTypePreview,
  'Looping' : GiphyCoreSDK.GPHRenditionTypeLooping,
  'FixedHeight' : GiphyCoreSDK.GPHRenditionTypeFixedHeight,
  'FixedHeightStill' : GiphyCoreSDK.GPHRenditionTypeFixedHeightStill,
  'FixedHeightDownsampled' : GiphyCoreSDK.GPHRenditionTypeFixedHeightDownsampled,
  'FixedHeightSmall' : GiphyCoreSDK.GPHRenditionTypeFixedHeightSmall,
  'FixedHeightSmallStill' : GiphyCoreSDK.GPHRenditionTypeFixedHeightSmallStill,
  'FixedWidth' : GiphyCoreSDK.GPHRenditionTypeFixedWidth,
  'FixedWidthStill' : GiphyCoreSDK.GPHRenditionTypeFixedWidthStill,
  'FixedWidthDownsampled' : GiphyCoreSDK.GPHRenditionTypeFixedWidthDownsampled,
  'FixedWidthSmall' : GiphyCoreSDK.GPHRenditionTypeFixedWidthSmall,
  'FixedWidthSmallStill' : GiphyCoreSDK.GPHRenditionTypeFixedWidthSmallStill,
  'Downsized' : GiphyCoreSDK.GPHRenditionTypeDownsized,
  'DownsizedSmall' : GiphyCoreSDK.GPHRenditionTypeDownsizedSmall,
  'DownsizedMedium' : GiphyCoreSDK.GPHRenditionTypeDownsizedMedium,
  'DownsizedLarge' : GiphyCoreSDK.GPHRenditionTypeDownsizedLarge,
  'DownsizedStill' : GiphyCoreSDK.GPHRenditionTypeDownsizedStill

};

(function constructor() {
  GiphyCore.configureWithApiKey(apiKey);
})();

function search(opts, callback) {
  GiphyCore.shared.searchMediaOffsetLimitRatingLangCompletionHandler(
      opts.query, opts.mediaType, opts.offset, opts.limit, opts.rating, opts.language,
      (response, error) => {
        if (error) {
          callback(error, null);
          return;
        }
        const mediaArray = NSArray.cast(response.data);
        const imagesArray = [];
        mediaArray.enumerateObjectsUsingBlock(media => {
          const m = GPHMedia.cast(media);
          const gphImage = m.images.rendition(opts.renditionType);
          const serialisedmedia = serialiseGPHImage(gphImage);
          serialisedmedia.title = m.title;
          imagesArray.push(serialisedmedia);
        });
        callback(null, imagesArray);
      });
}
function trending(opts, callback) {
  GiphyCore.shared.trendingOffsetLimitRatingCompletionHandler(
      opts.mediaType, opts.offset, opts.limit, opts.rating, (response, error) => {
        if (error) {
          callback(error, null);
          return;
        }
        const mediaArray = NSArray.cast(response.data);
        const imagesArray = [];
        mediaArray.enumerateObjectsUsingBlock(media => {
          const m = GPHMedia.cast(media);
          const gphImage = m.images.rendition(opts.renditionType);
          const serialisedmedia = serialiseGPHImage(gphImage);
          serialisedmedia.title = m.title;
          imagesArray.push(serialisedmedia);
        });
        callback(null, imagesArray);
      });
}
function translate(opts, callback) {
  GiphyCore.shared.translateMediaRatingLangCompletionHandler(
      opts.text, opts.mediaType, opts.rating, opts.language, (response, error) => {
        if (error) {
          callback(error, null);
          return;
        }
        const m = GPHMedia.cast(response.data);
        const gphImage = m.images.rendition(opts.renditionType);
        const serialisedmedia = serialiseGPHImage(gphImage)
        serialisedmedia.title = m.title;
        callback(null, serialisedmedia);
      });
}
function serialiseGPHImage(gphImage) {
  return {
    mediaId : gphImage.mediaId,
    rendition : gphImage.rendition,
    gifUrl : gphImage.gifUrl,
    stillGifUrl : gphImage.stillGifUrl,
    width : gphImage.width,
    height : gphImage.height,
    frames : gphImage.frames,
    gifSize : gphImage.gifSize,
    webPUrl : gphImage.webPUrl,
    webPSize : gphImage.webPSize,
    mp4Url : gphImage.mp4Url,
    mp4Size : gphImage.mp4Size,
    jsonRepresentation : gphImage.jsonRepresentation
  };
}
function setLanguageFromLocale() {
  let language;
  const locale = Titanium.Platform.locale.split('-')[0];
  switch (locale) {
  case 'es':
    language = GiphyCoreSDK.GPHLanguageTypeSpanish;
    break;
  case 'pt':
    language = GiphyCoreSDK.GPHLanguageTypePortuguese;
    break;
  case 'id':
    language = GiphyCoreSDK.GPHLanguageTypeIndonesian;
    break;
  case 'fr':
    language = GiphyCoreSDK.GPHLanguageTypeFrench;
    break;
  case 'ar':
    language = GiphyCoreSDK.GPHLanguageTypeArabic;
    break;
  case 'tr':
    language = GiphyCoreSDK.GPHLanguageTypeTurkish;
    break;
  case 'th':
    language = GiphyCoreSDK.GPHLanguageTypeThai;
    break;
  case 'vi':
    language = GiphyCoreSDK.GPHLanguageTypeVietnamese;
    break;
  case 'de':
    language = GiphyCoreSDK.GPHLanguageTypeGerman;
    break;
  case 'it':
    language = GiphyCoreSDK.GPHLanguageTypeItalian;
    break;
  case 'ja':
    language = GiphyCoreSDK.GPHLanguageTypeJapanese;
    break;
  case 'zh':
    const chineseLocale = Titanium.Platform.locale;
    language = (chineseLocale == 'zh-tw') ? GiphyCoreSDK.GPHLanguageTypeChineseSimplified
                                          : GiphyCoreSDK.GPHLanguageTypeChineseTraditional;
    break;
  case 'ru':
    language = GiphyCoreSDK.GPHLanguageTypeRussian;
    break;
  case 'ko':
    language = GiphyCoreSDK.GPHLanguageTypeKorean;
    break;
  case 'pl':
    language = GiphyCoreSDK.GPHLanguageTypePolish;
    break;
  case 'nl':
    language = GiphyCoreSDK.GPHLanguageTypeDutch;
    break;
  case 'ro':
    language = GiphyCoreSDK.GPHLanguageTypeRomanian;
    break;
  case 'hu':
    language = GiphyCoreSDK.GPHLanguageTypeHungarian;
    break;
  case 'sv':
    language = GiphyCoreSDK.GPHLanguageTypeSwedish;
    break;
  case 'cz':
    language = GiphyCoreSDK.GPHLanguageTypeCzech;
    break;
  case 'hi':
    language = GiphyCoreSDK.GPHLanguageTypeHindi;
    break;
  case 'bn':
    language = GiphyCoreSDK.GPHLanguageTypeBengali;
    break;
  case 'da':
    language = GiphyCoreSDK.GPHLanguageTypeDanish;
    break;
  case 'fa':
    language = GiphyCoreSDK.GPHLanguageTypeFarsi;
    break;
  case 'tl':
    language = GiphyCoreSDK.GPHLanguageTypeFilipino;
    break;
  case 'fi':
    language = GiphyCoreSDK.GPHLanguageTypeFinnish;
    break;
  case 'iw':
    language = GiphyCoreSDK.GPHLanguageTypeHebrew;
    break;
  case 'ms':
    language = GiphyCoreSDK.GPHLanguageTypeMalay;
    break;
  case 'no':
    language = GiphyCoreSDK.GPHLanguageTypeNorwegian;
    break;
  case 'uk':
    language = GiphyCoreSDK.GPHLanguageTypeUkrainian;
    break;
  default:
    language = GiphyCoreSDK.GPHLanguageTypeEnglish;
    break;
  }
  return language;
}
export {setLanguageFromLocale, translate, search, trending, MediaType, RenditionType, Rating}
