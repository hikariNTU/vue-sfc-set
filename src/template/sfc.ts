import { SfcsetSetting, SfcStyleFormat } from "../setting";

type Attrs = Record<string, string|boolean>;

const getStyleBlock = (setting:SfcsetSetting) => {
  console.log(JSON.stringify(setting));
  if(!setting.styleEnable){
    return '';
  }
  const attrs:Attrs = {};
  const format = setting.styleLang === SfcStyleFormat.css ? undefined : setting.styleLang;
  if(format){
    attrs.lang=format;
  }
  if(setting.styleModule){
    attrs.module = true;
  }
  if(setting.styleScope){
    attrs.scoped = true;
  }

  return `
<style${attrsMapper(attrs)}></style>`;
};

const attrsMapper = (rec: Attrs) => {
  let str = '';
  Object.entries(rec).forEach(([attr, val]) => {
    if(val){
      str += ` ${attr}`;
      if(typeof val === 'string'){
        str += `="${val}"`;
      }
    }
  });
  return str;
};

const getSfcText = (name: string, setting: SfcsetSetting) => 
`<template>
  <div></div>
</template>

<script lang="${setting.sfcLang}">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '${name}',
  setup() {
    return {};
  },
});
</script>
${getStyleBlock(setting)}`;



export {getSfcText};