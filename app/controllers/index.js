import {
  MediaType,
  Rating,
  RenditionType,
  search as giphySearch,
  setLanguageFromLocale,
  translate as giphyTranslate,
  trending as giphyTrending
} from "giphyHelper";

$.index.open();
function search(e) {
  giphySearch({
    query : $.queryText.value,
    mediaType : MediaType.GIF,
    renditionType : RenditionType.FixedWidth,
    language : setLanguageFromLocale(),
    offset : 0,
    limit : 20,
    rating : Rating.R
  },
              (error, data) => {
                if (error) {
                  console.log('search invoked error', error);
                  return;
                }
                // console.log('search invoked data', data);
                $.index.activeTab.open(
                    Alloy.createController('/searchResultList', {mediaArray : data}).getView());

              });
}
function trending() {
  giphyTrending({
    mediaType : MediaType.STICKER,
    renditionType : RenditionType.FixedWidth,
    offset : 0,
    limit : 20,
    rating : Rating.PG
  },
                (error, data) => {
                  if (error) {
                    console.log('trending invoked error', error);
                    return;
                  }
                  console.log('trending invoked data', data);
                  $.index.activeTab.open(
                      Alloy.createController('/searchResultList', {mediaArray : data}).getView());

                });
}
function translate() {
  giphyTranslate(
      {
        text : $.queryText.value,
        mediaType : MediaType.STICKER,
        renditionType : RenditionType.FixedWidth,
        offset : 0,
        limit : 20,
        rating : Rating.PG
      },
      (error, data) => {
        if (error) {
          console.log('translate invoked error', error);
          return;
        }

        $.index.activeTab.open(
            Alloy
                .createController('/searchResultView',
                                  {gifUrl : data.gifUrl, mp4Url : data.mp4Url, title : data.title})
                .getView());

      });
}
