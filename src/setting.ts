import { WorkspaceConfiguration } from "vscode";

export enum SfcLang{
  ts= 'ts',
  js= 'js',
  jsx= 'jsx',
  tsx= 'tsx',
}

export enum SfcStyleFormat {
  css= 'css',
  scss= 'scss',
  sass= 'sass',
  stylus= 'stylus',
}

export interface SfcsetSetting extends WorkspaceConfiguration {
  sfcLang: SfcLang;
  styleEnable: boolean;
  styleLang: SfcStyleFormat;
  styleScope: boolean;
  styleModule: boolean
}