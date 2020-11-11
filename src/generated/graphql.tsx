/* eslint-disable */
// @ts-nocheck
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  DictType: any;
};

export type Query = {
  __typename?: 'Query';
  /** Запросы к данным ресурсной базы. */
  resourceBase?: Maybe<ResourceBaseQueries>;
  /** Данные конструктора логики */
  logic?: Maybe<Logic>;
  scenario?: Maybe<Array<Maybe<ScenarioType>>>;
  taxEnvironment?: Maybe<TaxEnvironmentType>;
  macroparameterSet?: Maybe<MacroparameterSetOrError>;
  macroparameterSetList?: Maybe<MacroparameterSetListOrError>;
  opex?: Maybe<OpexOrError>;
  capex?: Maybe<CapexOrError>;
  domain?: Maybe<DomainObjectQuery>;
};

export type QueryMacroparameterSetArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

/** Запросы к данным ресурсной базы. */
export type ResourceBaseQueries = {
  __typename?: 'ResourceBaseQueries';
  /** Пространство имен для работы с проектом. */
  project?: Maybe<ProjectQueries>;
  /** Пространство имен для работы с распределениями. */
  distribution?: Maybe<DistributionQueries>;
};

/** Пространство имен для работы с проектом. */
export type ProjectQueries = {
  __typename?: 'ProjectQueries';
  /** Шаблон структуры проекта */
  template?: Maybe<RbProject>;
  /** Валидация структуры проекта перед импортом/экспортом */
  validateBeforeLoad?: Maybe<Array<DetailError>>;
  /** Данные проекта */
  loadFromDatabase?: Maybe<RbProject>;
};

/** Пространство имен для работы с проектом. */
export type ProjectQueriesValidateBeforeLoadArgs = {
  project: RbProjectInput;
};

export type RbProject = {
  __typename?: 'RBProject';
  /** Версия шаблона структуры проекта */
  version: Scalars['String'];
  /** Список концепций проекта */
  conceptions: Array<Conception>;
};

export type Conception = {
  __typename?: 'Conception';
  /** Наименование концепции */
  name: Scalars['String'];
  /** Описание концепции */
  description: Scalars['String'];
  /** Вероятность концепции */
  probability?: Maybe<Scalars['Float']>;
  structure: ProjectStructure;
};

export type ProjectStructure = {
  __typename?: 'ProjectStructure';
  /** Список доменных сущностей геологических объектов */
  domainEntities: Array<RbDomainEntity>;
  /** Список подсчетных параметров */
  attributes: Array<Attribute>;
  /** Список рисков геологических объектов */
  risks: Array<Risk>;
  /** Список геологических объектов структуры проекта */
  domainObjects: Array<DomainObject>;
};

export type RbDomainEntity = {
  __typename?: 'RBDomainEntity';
  /** Имя доменной сущности геологического объекта */
  name: Scalars['String'];
  /** Иконка доменной сущности геологического объекта */
  icon: RbDomainEntityIcons;
};

/** Список иконок доменной сущности геологического объекта. */
export enum RbDomainEntityIcons {
  LicensingRoundIcon = 'LICENSING_ROUND_ICON',
  FieldIcon = 'FIELD_ICON',
  FormationIcon = 'FORMATION_ICON',
  OilPoolIcon = 'OIL_POOL_ICON',
  WellIcon = 'WELL_ICON',
}

export type Attribute = {
  __typename?: 'Attribute';
  /** Кодовое обозначение подсчётного параметра */
  code: Scalars['String'];
  /** Имя подсчётного параметра */
  name: Scalars['String'];
  /** Сокращенное имя или обозначение подсчётного параметра */
  shortName: Scalars['String'];
  /** Единицы измерения подсчётного параметра */
  units: Scalars['String'];
};

export type Risk = {
  __typename?: 'Risk';
  /** Кодовое обозначение риска */
  code: Scalars['String'];
  /** Наименование риска */
  name: Scalars['String'];
};

export type DomainObject = {
  __typename?: 'DomainObject';
  /** Иерархия геологического объекта в структуре проекта */
  domainObjectPath: Array<Scalars['String']>;
  /** Категория геологического объекта */
  geoObjectCategory: GeoObjectCategories;
  /** Список значений рисков геологического объекта */
  risksValues: Array<Maybe<Scalars['Float']>>;
  /** Список значений атрибутов геологического объекта */
  attributeValues: Array<Maybe<Distribution>>;
};

/** Список категорий геологического объекта. */
export enum GeoObjectCategories {
  Reserves = 'RESERVES',
  Resources = 'RESOURCES',
}

/** Параметры распределения. */
export type Distribution = {
  __typename?: 'Distribution';
  /** Тип распределения */
  type: DistributionTypes;
  /** Способ задания распределения */
  definition: DistributionDefinitionTypes;
  /** Параметры распределения */
  parameters: Array<Maybe<DistributionParameter>>;
};

/** Типы распределений. */
export enum DistributionTypes {
  /** Нормальное распределение */
  Normal = 'NORMAL',
  /** Логнормальное распределение */
  Lognormal = 'LOGNORMAL',
  /** Треугольное распределение */
  Triangular = 'TRIANGULAR',
  /** Равномерное распределение */
  Uniform = 'UNIFORM',
  /** Бета распределение */
  Beta = 'BETA',
  /** ПЕРТ распределение */
  Pert = 'PERT',
}

/** Способы задания распределений. */
export enum DistributionDefinitionTypes {
  /** Через среднее и стандартное отклонение */
  MeanSd = 'MEAN_SD',
  /** Через минимум и максимум */
  MinMax = 'MIN_MAX',
  /** Через расположение, логарифмическое среднее и логарифмическое стандартное отклонение */
  LocationLogmeanLogsd = 'LOCATION_LOGMEAN_LOGSD',
  /** Через расположение, геометрическое среднее и геометрическое стандартное отклонение */
  LocationGeommeanGeomsd = 'LOCATION_GEOMMEAN_GEOMSD',
  /** Через расположение, арифметическое среднее и арифметическое стандартное отклонение */
  LocationArmeanArsd = 'LOCATION_ARMEAN_ARSD',
  /** Через наиболее вероятное, минимум и максимум */
  ModeMinMax = 'MODE_MIN_MAX',
  /** Через альфа, бета, минимум и максимум */
  AlphaBetaMinMax = 'ALPHA_BETA_MIN_MAX',
  /** Через два процентиля */
  TwoPercentiles = 'TWO_PERCENTILES',
  /** Через три процентиля */
  ThreePercentiles = 'THREE_PERCENTILES',
  /** Через четыре процентиля */
  FourPercentiles = 'FOUR_PERCENTILES',
  /** Через среднее и один процентиль */
  MeanOnePercentile = 'MEAN_ONE_PERCENTILE',
  /** Через расположение и два процентиля */
  LocationTwoPercentiles = 'LOCATION_TWO_PERCENTILES',
  /** Через расположение, среднее и один процентиль */
  LocationMeanOnePercentile = 'LOCATION_MEAN_ONE_PERCENTILE',
  /** Через среднее и два процентиля */
  MeanTwoPercentiles = 'MEAN_TWO_PERCENTILES',
  /** Через наиболее вероятное и два процентиля */
  ModeTwoPercentiles = 'MODE_TWO_PERCENTILES',
  /** Через минимум, максимум и два процентиля */
  MinMaxTwoPercentiles = 'MIN_MAX_TWO_PERCENTILES',
}

/** Параметр способа задания распределения. */
export type DistributionParameter = {
  __typename?: 'DistributionParameter';
  /** Тип параметра распределения */
  type: DistributionParameterTypes;
  value: Scalars['Float'];
};

/** Тип параметра задания распределения. */
export enum DistributionParameterTypes {
  /** Среднее */
  Mean = 'MEAN',
  /** Стандартное отклонение */
  Sd = 'SD',
  /** Минимум */
  Min = 'MIN',
  /** Максимум */
  Max = 'MAX',
  /** Расположение */
  Location = 'LOCATION',
  /** Наиболее вероятное */
  Mode = 'MODE',
  /** Логарифмическое среднее */
  Logmean = 'LOGMEAN',
  /** Логарифмическое стандартное отклонение */
  Logsd = 'LOGSD',
  /** Геометрическое среднее */
  Geommean = 'GEOMMEAN',
  /** Геометрическое стандартное отклонение */
  Geomsd = 'GEOMSD',
  /** Арифметическое среднее */
  Armean = 'ARMEAN',
  /** Арифметическое стандартное отклонение */
  Arsd = 'ARSD',
  /** Параметр расположения Альфа */
  Alpha = 'ALPHA',
  /** Параметр расположения Бэта */
  Beta = 'BETA',
  /** Первый квантильный ранг */
  Q1Rank = 'Q1_RANK',
  /** Второй квантильный ранг */
  Q2Rank = 'Q2_RANK',
  /** Третий квантильный ранг */
  Q3Rank = 'Q3_RANK',
  /** Четвертый квантильный ранг */
  Q4Rank = 'Q4_RANK',
  /** Значение первого квантиля */
  Q1Value = 'Q1_VALUE',
  /** Значение второго квантиля */
  Q2Value = 'Q2_VALUE',
  /** Значение третьего квантиля */
  Q3Value = 'Q3_VALUE',
  /** Значение четвертого квантиля */
  Q4Value = 'Q4_VALUE',
}

/** Ошибка с дополнительной информацией. */
export type DetailError = RbErrorInterface & {
  __typename?: 'DetailError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: RbErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  /** Детальная информация об ошибке */
  details?: Maybe<Scalars['String']>;
};

/** Интерфейс ошибок, отображаемых пользователю. */
export type RbErrorInterface = {
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: RbErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
};

/** Список кодов ошибок приложения. */
export enum RbErrorCodes {
  /** Ошибка в загружаемой структуре */
  IncorrectProjectStructure = 'INCORRECT_PROJECT_STRUCTURE',
  /** В строке данных таблицы структуры не может быть пустых ячеек */
  EmptyCellInTableData = 'EMPTY_CELL_IN_TABLE_DATA',
  /** В таблице структуры не может быть одинаковых строк */
  IdenticalRowInTableData = 'IDENTICAL_ROW_IN_TABLE_DATA',
  /** Версия импортируемого файла не соответствует версии шаблона структуры */
  IncorrectFileVersion = 'INCORRECT_FILE_VERSION',
  /** Некорректная зависимость параметров распределения */
  DistributionParametersIncorrectRelation = 'DISTRIBUTION_PARAMETERS_INCORRECT_RELATION',
  /** Параметр распределения выходит за границы допустимых значений */
  DistributionParameterOutOfRange = 'DISTRIBUTION_PARAMETER_OUT_OF_RANGE',
  /** Для старта расчётов заполните ячейку таблицы */
  CellValueIsNull = 'CELL_VALUE_IS_NULL',
  /** Вероятность может иметь значение в пределах от 0.0 до 1.0 */
  InvalidProbabilityValue = 'INVALID_PROBABILITY_VALUE',
  /** Некорректное значение параметра для этого способа задания */
  IncorrectParameterValueForDefinition = 'INCORRECT_PARAMETER_VALUE_FOR_DEFINITION',
  /** Квантили должны убывать */
  QuantilesMustBeDescending = 'QUANTILES_MUST_BE_DESCENDING',
  /** Квантильные ранги должны возрастать */
  QuantileRanksMustBeAscending = 'QUANTILE_RANKS_MUST_BE_ASCENDING',
  /** В концепции отсутствует поле "вероятность" */
  ConceptionProbabilityIsNone = 'CONCEPTION_PROBABILITY_IS_NONE',
  /** Найдены концепции с не уникальными наименованиями */
  DuplicatingConceptionsNames = 'DUPLICATING_CONCEPTIONS_NAMES',
}

export type RbProjectInput = {
  /** Версия шаблона структуры проекта */
  version: Scalars['String'];
  /** Список концепций проекта */
  conceptions: Array<ConceptionInput>;
};

export type ConceptionInput = {
  /** Наименование концепции */
  name: Scalars['String'];
  /** Описание концепции */
  description: Scalars['String'];
  /** Вероятность концепции */
  probability?: Maybe<Scalars['Float']>;
  structure: ProjectStructureInput;
};

export type ProjectStructureInput = {
  /** Список доменных сущностей геологических объектов */
  domainEntities: Array<RbDomainEntityInput>;
  /** Список подсчетных параметров */
  attributes: Array<AttributeInput>;
  /** Список рисков геологических объектов */
  risks: Array<RiskInput>;
  /** Список геологических объектов структуры проекта */
  domainObjects: Array<DomainObjectInput>;
};

export type RbDomainEntityInput = {
  /** Имя доменной сущности геологического объекта */
  name: Scalars['String'];
  /** Иконка доменной сущности геологического объекта */
  icon: RbDomainEntityIcons;
};

export type AttributeInput = {
  /** Кодовое обозначение подсчётного параметра */
  code: Scalars['String'];
  /** Имя подсчётного параметра */
  name: Scalars['String'];
  /** Сокращенное имя или обозначение подсчётного параметра */
  shortName: Scalars['String'];
  /** Единицы измерения подсчётного параметра */
  units: Scalars['String'];
};

export type RiskInput = {
  /** Кодовое обозначение риска */
  code: Scalars['String'];
  /** Наименование риска */
  name: Scalars['String'];
};

export type DomainObjectInput = {
  /** Иерархия геологического объекта в структуре проекта */
  domainObjectPath: Array<Scalars['String']>;
  /** Категория геологического объекта */
  geoObjectCategory: GeoObjectCategories;
  /** Список значений рисков геологического объекта */
  risksValues: Array<Maybe<Scalars['Float']>>;
  /** Список значений атрибутов геологического объекта */
  attributeValues: Array<Maybe<DistributionInput>>;
};

/** Параметры распределения. */
export type DistributionInput = {
  /** Тип распределения */
  type: DistributionTypes;
  /** Способ задания распределения */
  definition: DistributionDefinitionTypes;
  /** Параметры распределения */
  parameters: Array<Maybe<DistributionParameterInput>>;
};

/** Параметр способа задания распределения. */
export type DistributionParameterInput = {
  /** Тип параметра распределения */
  type: DistributionParameterTypes;
  value: Scalars['Float'];
};

/** Пространство имен для работы с распределениями. */
export type DistributionQueries = {
  __typename?: 'DistributionQueries';
  /** Результат вычисления значения распределения */
  distributionChart?: Maybe<DistributionChartResult>;
};

/** Пространство имен для работы с распределениями. */
export type DistributionQueriesDistributionChartArgs = {
  distribution: DistributionInput;
};

export type DistributionChartResult =
  | DistributionChart
  | DistributionDefinitionErrors;

/** Результаты вычисления заданного распределения. */
export type DistributionChart = {
  __typename?: 'DistributionChart';
  /** График функции плотности распределения */
  pdf: Array<Point>;
  /** Функция надежности (1 - cdf) */
  sf: Array<Point>;
  /** Точки процентилей */
  percentiles: Array<Percentile>;
};

/** Точка на графике. */
export type Point = {
  __typename?: 'Point';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

/** Точка на графике. */
export type Percentile = {
  __typename?: 'Percentile';
  point: Point;
  /** Процентильный ранг (1-99) */
  rank: Scalars['Int'];
};

/** Список ошибок задания распределения. */
export type DistributionDefinitionErrors = {
  __typename?: 'DistributionDefinitionErrors';
  errors: Array<DistributionDefinitionError>;
};

/** Ошибка задания распределения. */
export type DistributionDefinitionError = RbErrorInterface & {
  __typename?: 'DistributionDefinitionError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: RbErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  /** Список параметров задания распределения, к которым относится ошибка */
  fields: Array<Scalars['String']>;
};

/** Модель логики проекта - хранение внутри сущности проекта. */
export type Logic = {
  __typename?: 'Logic';
  canvas?: Maybe<Array<Maybe<CanvasNode>>>;
  stepList?: Maybe<Array<Maybe<ScenarioStep>>>;
};

/** Узлы логики проекта (шаги сценария, мероприятия, объекты, группы объектов). */
export type CanvasNode = {
  __typename?: 'CanvasNode';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  nodeRef?: Maybe<Scalars['ID']>;
  nodeType?: Maybe<Scalars['String']>;
  position?: Maybe<Array<Maybe<Scalars['Float']>>>;
  title?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
  children?: Maybe<Array<Maybe<CanvasNode>>>;
  parents?: Maybe<Array<Maybe<CanvasNode>>>;
};

/**
 * Шаг сценария.
 *
 *     Состоит из списка позиций - пар мероприятие-объект.
 */
export type ScenarioStep = {
  __typename?: 'ScenarioStep';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  itemList?: Maybe<Array<Maybe<ScenarioStepItem>>>;
};

/**
 * Позиция шага сценария - пара объект-мероприятие.
 *
 *     Опционально содержит исходную группу объектов (в случае если объект был
 *     добавлен из группы) для определения актуальности позиции в случае динамической группы
 */
export type ScenarioStepItem = {
  __typename?: 'ScenarioStepItem';
  object?: Maybe<DomainObjectInterface>;
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  activity?: Maybe<ProjectActivity>;
  effectList?: Maybe<Array<Maybe<ActivityEffect>>>;
};

/** Интерфейс доменного объекта. */
export type DomainObjectInterface = {
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

/**
 * Мероприятие проекта.
 *
 *     Конфигурируется в рамках проекта в паре с объектом
 */
export type ProjectActivity = {
  __typename?: 'ProjectActivity';
  activityType?: Maybe<Activity>;
  name?: Maybe<Scalars['String']>;
  risk?: Maybe<Scalars['String']>;
};

export type Activity = {
  __typename?: 'Activity';
  category?: Maybe<ActivityLibraryCategory>;
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ActivityLibraryCategory = {
  __typename?: 'ActivityLibraryCategory';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<ActivityLibraryCategory>;
};

/** Эффект мероприятия */
export type ActivityEffect = {
  __typename?: 'ActivityEffect';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  trigger?: Maybe<Scalars['String']>;
  formula?: Maybe<Scalars['String']>;
};

/** Сценарий либо для описания стоимостей различных видов продукции по годам. */
export type ScenarioType = {
  __typename?: 'ScenarioType';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  /** Виды продукции */
  productTypesList?: Maybe<Array<Maybe<ProductType>>>;
  netback?: Maybe<Array<Maybe<NetbackPriceType>>>;
};

/** Вид продукции. Примеры видов продукции - нефть, газ, газовый конденсат, пнг. */
export type ProductType = {
  __typename?: 'ProductType';
  id: Scalars['ID'];
  /** Название вида продукции */
  name?: Maybe<Scalars['String']>;
  fareAllow?: Maybe<Scalars['Boolean']>;
  yearStart?: Maybe<Scalars['Int']>;
  yearEnd?: Maybe<Scalars['Int']>;
  qualityDiscount?: Maybe<Scalars['Float']>;
  qualityAward?: Maybe<Scalars['Float']>;
  /** Список продукции */
  products?: Maybe<Array<Maybe<Product>>>;
  /** Список связанных расчетов */
  calculations?: Maybe<Array<Maybe<Calculation>>>;
  netback?: Maybe<NetbackPriceType>;
};

/** Вид продукции. Примеры видов продукции - нефть, газ, газовый конденсат, пнг. */
export type ProductTypeNetbackArgs = {
  id?: Maybe<Scalars['String']>;
  netbackType?: Maybe<Scalars['String']>;
};

/** Продукт полученный в результате производства основного вида продукции. */
export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  /** Название продукта */
  name?: Maybe<Scalars['String']>;
  fareAllow?: Maybe<Scalars['Boolean']>;
  yearStart?: Maybe<Scalars['Int']>;
  qualityAward?: Maybe<Scalars['Float']>;
  /** Список связанных цен */
  prices?: Maybe<Array<Maybe<AverageAnnualPriceType>>>;
};

export type AverageAnnualPriceType = {
  __typename?: 'AverageAnnualPriceType';
  /** Год */
  year?: Maybe<Scalars['Int']>;
  /** Цена */
  price?: Maybe<Scalars['Float']>;
};

export type Calculation = {
  __typename?: 'Calculation';
  /** Название */
  name: Scalars['String'];
  /** Цены */
  prices: Array<Maybe<AverageAnnualPriceType>>;
};

export type NetbackPriceType = {
  __typename?: 'NetbackPriceType';
  name?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<Maybe<AverageAnnualPriceType>>>;
  netbackType?: Maybe<Scalars['String']>;
  units?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<AverageAnnualPriceType>>>;
};

export type TaxEnvironmentType = {
  __typename?: 'TaxEnvironmentType';
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
  currentTaxMode?: Maybe<CurrentTaxMode>;
  dns?: Maybe<DnsType>;
  ndd?: Maybe<NddType>;
};

/** An enumeration. */
export enum CurrentTaxMode {
  Nds = 'NDS',
  Ndd = 'NDD',
}

export type DnsType = {
  __typename?: 'DnsType';
  commonChapter?: Maybe<CommonChapterType>;
  ndpiOilChapter?: Maybe<NdpiOilChapterType>;
  ndpiGasChapter?: Maybe<NdpiGasChapterType>;
};

export type CommonChapterType = {
  __typename?: 'CommonChapterType';
  macroparameters?: Maybe<Array<Maybe<Macroparameter>>>;
  profiles?: Maybe<Array<Maybe<TaxDnsProfileType>>>;
};

export type CommonChapterTypeMacroparametersArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type CommonChapterTypeProfilesArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type Macroparameter = {
  __typename?: 'Macroparameter';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<MacroparameterYearValueType>>>;
  yearValue?: Maybe<YearValueOrError>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type MacroparameterYearValueArgs = {
  year?: Maybe<Scalars['Int']>;
};

export type MacroparameterYearValueType = {
  __typename?: 'MacroparameterYearValueType';
  year?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type YearValueOrError = YearValue | Error;

export type YearValue = {
  __typename?: 'YearValue';
  yearValue?: Maybe<Scalars['Float']>;
};

/** Common error-object class. */
export type Error = ErrorInterface & {
  __typename?: 'Error';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['DictType']>;
};

/** Интерфейс ошибок, отображаемых пользователю. */
export type ErrorInterface = {
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['DictType']>;
};

/** Error codes list. */
export enum ErrorCodes {
  /** Проект не найден */
  ProjectNotFound = 'PROJECT_NOT_FOUND',
  /** Проект уже удалён */
  ProjectAlreadyRemoved = 'PROJECT_ALREADY_REMOVED',
  /** Ошибка при обновлении проекта */
  ProjectUpdateError = 'PROJECT_UPDATE_ERROR',
  /** Объект справочника не найден */
  ReferenceItemNotFound = 'REFERENCE_ITEM_NOT_FOUND',
  /** Ошибка */
  Error = 'ERROR',
  /** Не корректная версия проекта */
  IncorrectProjectVersion = 'INCORRECT_PROJECT_VERSION',
  /** Расхождение версий проекта */
  ProjectVersionDiffError = 'PROJECT_VERSION_DIFF_ERROR',
  /** Проект с таким именем уже существует */
  ProjectNameAlreadyExists = 'PROJECT_NAME_ALREADY_EXISTS',
  /** Пустое имя проекта */
  EmptyProjectName = 'EMPTY_PROJECT_NAME',
  /** Пользователь не обладает провами для совершения операции */
  NoRights = 'NO_RIGHTS',
  /** Объект не найден */
  ObjectNotFound = 'OBJECT_NOT_FOUND',
}

export type TaxDnsProfileType = {
  __typename?: 'TaxDnsProfileType';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<DnsProfileYearValueType>>>;
  unit?: Maybe<Scalars['String']>;
};

export type DnsProfileYearValueType = {
  __typename?: 'DnsProfileYearValueType';
  year?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type NdpiOilChapterType = {
  __typename?: 'NdpiOilChapterType';
  macroparameters?: Maybe<Array<Maybe<Macroparameter>>>;
  yearStartKkan?: Maybe<Scalars['Int']>;
  zeroValues?: Maybe<Scalars['Float']>;
};

export type NdpiOilChapterTypeMacroparametersArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type NdpiGasChapterType = {
  __typename?: 'NdpiGasChapterType';
  macroparameters?: Maybe<Array<Maybe<Macroparameter>>>;
};

export type NdpiGasChapterTypeMacroparametersArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type NddType = {
  __typename?: 'NddType';
  uralsQualityPremium?: Maybe<Scalars['Float']>;
  uralsQualityDiscount?: Maybe<Scalars['Float']>;
  incomeTaxBase?: Maybe<IncomeTaxBase>;
  macroparameters?: Maybe<Array<Maybe<Macroparameter>>>;
};

export type NddTypeMacroparametersArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum IncomeTaxBase {
  WithoutTransition = 'WITHOUT_TRANSITION',
  WithTransition = 'WITH_TRANSITION',
}

export type MacroparameterSetOrError = MacroparameterSet | Error;

export type MacroparameterSet = {
  __typename?: 'MacroparameterSet';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
  allProjects?: Maybe<Scalars['Boolean']>;
  category?: Maybe<MacroparameterSetCategory>;
  macroparameterGroup?: Maybe<MacroparameterGroupOrError>;
  macroparameterGroupList?: Maybe<MacroparameterGroupListOrError>;
};

export type MacroparameterSetMacroparameterGroupArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

/** An enumeration. */
export enum MacroparameterSetCategory {
  SetCategoryReal = 'SET_CATEGORY_REAL',
  SetCategoryNominal = 'SET_CATEGORY_NOMINAL',
}

export type MacroparameterGroupOrError = MacroparameterGroup | Error;

export type MacroparameterGroup = {
  __typename?: 'MacroparameterGroup';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  macroparameter?: Maybe<MacroparameterOrError>;
  macroparameterList?: Maybe<MacroparameterListOrError>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type MacroparameterGroupMacroparameterArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type MacroparameterGroupMacroparameterListArgs = {
  id?: Maybe<Scalars['String']>;
};

export type MacroparameterOrError = Macroparameter | Error;

export type MacroparameterListOrError = MacroparameterList | Error;

export type MacroparameterList = {
  __typename?: 'MacroparameterList';
  macroparameterList?: Maybe<Array<Maybe<Macroparameter>>>;
};

export type MacroparameterGroupListOrError = MacroparameterGroupList | Error;

export type MacroparameterGroupList = {
  __typename?: 'MacroparameterGroupList';
  macroparameterGroupList?: Maybe<Array<Maybe<MacroparameterGroup>>>;
};

export type MacroparameterSetListOrError = MacroparameterSetList | Error;

export type MacroparameterSetList = {
  __typename?: 'MacroparameterSetList';
  macroparameterSetList?: Maybe<Array<Maybe<MacroparameterSet>>>;
};

export type OpexOrError = Opex | Error;

export type Opex = {
  __typename?: 'Opex';
  autoexport?: Maybe<OpexExpenseGroupOrError>;
  mkos?: Maybe<OpexExpenseGroupOrError>;
  opexCaseList?: Maybe<OpexExpenseGroupListOrError>;
  opexCase?: Maybe<OpexExpenseGroupOrError>;
  hasAutoexport?: Maybe<Scalars['Boolean']>;
  hasMkos?: Maybe<Scalars['Boolean']>;
  sdf?: Maybe<Scalars['Boolean']>;
};

export type OpexOpexCaseArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type OpexExpenseGroupOrError = OpexExpenseGroup | Error;

export type OpexExpenseGroup = {
  __typename?: 'OpexExpenseGroup';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  yearEnd?: Maybe<Scalars['Int']>;
  opexExpenseList?: Maybe<OpexExpenseListOrError>;
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type OpexExpenseGroupOpexExpenseArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type OpexExpenseListOrError = OpexExpenseList | Error;

export type OpexExpenseList = {
  __typename?: 'OpexExpenseList';
  opexExpenseList?: Maybe<Array<Maybe<OpexExpense>>>;
};

export type OpexExpense = {
  __typename?: 'OpexExpense';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<OpexYearValue>>>;
  valueTotal?: Maybe<Scalars['Float']>;
  yearValue?: Maybe<YearValueOrError>;
};

export type OpexExpenseYearValueArgs = {
  year?: Maybe<Scalars['Int']>;
};

export type OpexYearValue = {
  __typename?: 'OpexYearValue';
  year?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type OpexExpenseOrError = OpexExpense | Error;

export type OpexExpenseGroupListOrError = OpexExpenseGroupList | Error;

export type OpexExpenseGroupList = {
  __typename?: 'OpexExpenseGroupList';
  opexCaseList?: Maybe<Array<Maybe<OpexExpenseGroup>>>;
};

export type CapexOrError = Capex | Error;

export type Capex = {
  __typename?: 'Capex';
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
  capexExpenseGroupList?: Maybe<CapexExpenseGroupListOrError>;
  capexGlobalValueList?: Maybe<CapexGlobalValueListOrError>;
  capexExpenseGroup?: Maybe<CapexExpenseGroupOrError>;
  capexGlobalValue?: Maybe<CapexGlobalValueOrError>;
};

export type CapexCapexExpenseGroupArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type CapexCapexGlobalValueArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type CapexExpenseGroupListOrError = CapexExpenseGroupList | Error;

export type CapexExpenseGroupList = {
  __typename?: 'CapexExpenseGroupList';
  capexExpenseGroupList?: Maybe<Array<Maybe<CapexExpenseGroup>>>;
};

export type CapexExpenseGroup = {
  __typename?: 'CapexExpenseGroup';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  valueTotal?: Maybe<Scalars['Float']>;
  capexExpenseList?: Maybe<CapexExpenseListOrError>;
  capexExpense?: Maybe<CapexExpenseOrError>;
  totalValueByYear?: Maybe<Array<Maybe<CapexYearValueType>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type CapexExpenseGroupCapexExpenseArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
};

export type CapexExpenseListOrError = CapexExpenseList | Error;

export type CapexExpenseList = {
  __typename?: 'CapexExpenseList';
  capexExpenseList?: Maybe<Array<Maybe<CapexExpense>>>;
};

export type CapexExpense = {
  __typename?: 'CapexExpense';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<CapexYearValueType>>>;
  valueTotal?: Maybe<Scalars['Float']>;
  yearValue?: Maybe<YearValueOrError>;
  createdAt?: Maybe<Scalars['DateTime']>;
};

export type CapexExpenseYearValueArgs = {
  year?: Maybe<Scalars['Int']>;
};

export type CapexYearValueType = {
  __typename?: 'CapexYearValueType';
  year?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Float']>;
};

export type CapexExpenseOrError = CapexExpense | Error;

export type CapexGlobalValueListOrError = CapexGlobalValueList | Error;

export type CapexGlobalValueList = {
  __typename?: 'CapexGlobalValueList';
  capexGlobalValueList?: Maybe<Array<Maybe<CapexGlobalValue>>>;
};

export type CapexGlobalValue = {
  __typename?: 'CapexGlobalValue';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['String']>;
};

export type CapexExpenseGroupOrError = CapexExpenseGroup | Error;

export type CapexGlobalValueOrError = CapexGlobalValue | Error;

export type DomainObjectQuery = {
  __typename?: 'DomainObjectQuery';
  geoEconomicAppraisalProject?: Maybe<GeoEconomicAppraisalProject_Type>;
  geoEconomicAppraisalProjectList?: Maybe<
    Array<Maybe<GeoEconomicAppraisalProject_Type>>
  >;
  domainObject?: Maybe<DomainObjectInterface>;
  project?: Maybe<Project_Union>;
  objectGroup?: Maybe<DomainObjectsGroup>;
  objectGroupList?: Maybe<Array<Maybe<DomainObjectsGroup>>>;
};

export type DomainObjectQueryGeoEconomicAppraisalProjectArgs = {
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

export type DomainObjectQueryDomainObjectArgs = {
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

export type DomainObjectQueryProjectArgs = {
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

export type DomainObjectQueryObjectGroupArgs = {
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

export type GeoEconomicAppraisalProject_Type = DomainObjectInterface & {
  __typename?: 'GeoEconomicAppraisalProject_Type';
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};``

export type Project_Union = GeoEconomicAppraisalProject_Type;

export type DomainObjectsGroup = {
  __typename?: 'DomainObjectsGroup';
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  objects?: Maybe<Array<Maybe<DomainObjectInterface>>>;
  formula?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Запросы к данным ресурсной базы. */
  resourceBase?: Maybe<ResourceBaseMutations>;
  logic?: Maybe<LogicMutations>;
  createScenario?: Maybe<ScenarioCreateMutation>;
  updateScenario?: Maybe<ScenarioUpdateMutation>;
  deleteScenario?: Maybe<ScenarioDeleteMutation>;
  createNetback?: Maybe<CreateNetback>;
  updateNetback?: Maybe<UpdateNetback>;
  deleteNetback?: Maybe<DeleteNetback>;
  createProductType?: Maybe<CreateProductType>;
  updateProductType?: Maybe<UpdateProductType>;
  deleteProductType?: Maybe<DeleteProductType>;
  createProduct?: Maybe<CreateProduct>;
  updateProduct?: Maybe<UpdateProduct>;
  deleteProduct?: Maybe<DeleteProduct>;
  createMacroparameterSet?: Maybe<CreateMacroparameterSet>;
  changeMacroparameterSet?: Maybe<ChangeMacroparameterSet>;
  deleteMacroparameterSet?: Maybe<DeleteMacroparameterSet>;
  createMacroparameterGroup?: Maybe<CreateMacroparameterGroup>;
  changeMacroparameterGroup?: Maybe<ChangeMacroparameterGroup>;
  deleteMacroparameterGroup?: Maybe<DeleteMacroparameterGroup>;
  createMacroparameter?: Maybe<CreateMacroparameter>;
  changeMacroparameter?: Maybe<ChangeMacroparameter>;
  clearMacroparameterValue?: Maybe<ClearMacroparameterValue>;
  setMacroparameterYearValue?: Maybe<SetMacroparameterYearValue>;
  deleteMacroparameter?: Maybe<DeleteMacroparameter>;
  setOpexAutoexport?: Maybe<SetOpexAutoexport>;
  changeOpexAutoexport?: Maybe<ChangeOpexAutoexport>;
  removeOpexAutoexport?: Maybe<RemoveOpexAutoexport>;
  createOpexAutoexportExpense?: Maybe<CreateOpexAutoexportExpense>;
  changeOpexAutoexportExpense?: Maybe<ChangeOpexAutoexportExpense>;
  deleteOpexAutoexportExpense?: Maybe<DeleteOpexAutoexportExpense>;
  setOpexAutoexportExpenseYearValue?: Maybe<SetOpexAutoexportExpenseYearValue>;
  setOpexMkos?: Maybe<SetOpexMkos>;
  setOpexSdf?: Maybe<SetOpexSdf>;
  changeOpexMkos?: Maybe<ChangeOpexMkos>;
  removeOpexMkos?: Maybe<RemoveOpexMkos>;
  createOpexMkosExpense?: Maybe<CreateOpexMkosExpense>;
  changeOpexMkosExpense?: Maybe<ChangeOpexMkosExpense>;
  deleteOpexMkosExpense?: Maybe<DeleteOpexMkosExpense>;
  setOpexMkosExpenseYearValue?: Maybe<SetOpexMkosExpenseYearValue>;
  createOpexCase?: Maybe<CreateOpexCase>;
  changeOpexCase?: Maybe<ChangeOpexCase>;
  deleteOpexCase?: Maybe<DeleteOpexCase>;
  createOpexCaseExpense?: Maybe<CreateOpexCaseExpense>;
  changeOpexCaseExpense?: Maybe<ChangeOpexCaseExpense>;
  deleteOpexCaseExpense?: Maybe<DeleteOpexCaseExpense>;
  setOpexCaseExpenseYearValue?: Maybe<SetOpexCaseExpenseYearValue>;
  createCapexExpenseGroup?: Maybe<CreateCapexExpenseGroup>;
  changeCapexExpenseGroup?: Maybe<ChangeCapexExpenseGroup>;
  deleteCapexExpenseGroup?: Maybe<DeleteCapexExpenseGroup>;
  setCapexExpenseYearValue?: Maybe<SetCapexExpenseYearValue>;
  createCapexExpense?: Maybe<CreateCapexExpense>;
  changeCapexExpense?: Maybe<ChangeCapexExpense>;
  deleteCapexExpense?: Maybe<DeleteCapexExpense>;
  createCapexGlobalValue?: Maybe<CreateCapexGlobalValue>;
  updateCapexGlobalValue?: Maybe<UpdateCapexGlobalValue>;
  deleteCapexGlobalValue?: Maybe<DeleteCapexGlobalValue>;
  macroparameter?: Maybe<MacroparameterMutation>;
  capex?: Maybe<CapexMutation>;
  opex?: Maybe<OpexMutation>;
  scenario?: Maybe<ScenarioMutation>;
  createCapex?: Maybe<CreateCapex>;
  domain?: Maybe<DomainMutations>;
};

export type MutationCreateScenarioArgs = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type MutationUpdateScenarioArgs = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productTypes?: Maybe<Array<Maybe<ProductTypeInput>>>;
  scenarioId: Scalars['ID'];
};

export type MutationDeleteScenarioArgs = {
  scenarioId: Scalars['ID'];
};

export type MutationCreateNetbackArgs = {
  netbackName: Scalars['String'];
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationUpdateNetbackArgs = {
  netbackName?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationDeleteNetbackArgs = {
  netbackName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type MutationCreateProductTypeArgs = {
  fareAllow?: Maybe<Scalars['Boolean']>;
  productTypeName: Scalars['String'];
  qualityAward?: Maybe<Scalars['Float']>;
  qualityDiscount?: Maybe<Scalars['Float']>;
  scenarioId: Scalars['ID'];
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationUpdateProductTypeArgs = {
  fareAllow?: Maybe<Scalars['Boolean']>;
  productTypeId: Scalars['ID'];
  productTypeName?: Maybe<Scalars['String']>;
  qualityAward?: Maybe<Scalars['Float']>;
  qualityDiscount?: Maybe<Scalars['Float']>;
  scenarioId: Scalars['ID'];
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationDeleteProductTypeArgs = {
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type MutationCreateProductArgs = {
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
};

export type MutationUpdateProductArgs = {
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productName?: Maybe<Scalars['String']>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
};

export type MutationDeleteProductArgs = {
  productName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type MutationCreateMacroparameterSetArgs = {
  allProjects?: Maybe<Scalars['Boolean']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<MacroparameterSetCategory>;
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type MutationChangeMacroparameterSetArgs = {
  allProjects?: Maybe<Scalars['Boolean']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<MacroparameterSetCategory>;
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type MutationDeleteMacroparameterSetArgs = {
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type MutationCreateMacroparameterGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MutationChangeMacroparameterGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type MutationDeleteMacroparameterGroupArgs = {
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type MutationCreateMacroparameterArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationChangeMacroparameterArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationClearMacroparameterValueArgs = {
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
};

export type MutationSetMacroparameterYearValueArgs = {
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MutationDeleteMacroparameterArgs = {
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type MutationSetOpexAutoexportArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationChangeOpexAutoexportArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationCreateOpexAutoexportExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationChangeOpexAutoexportExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationDeleteOpexAutoexportExpenseArgs = {
  expenseId: Scalars['ID'];
};

export type MutationSetOpexAutoexportExpenseYearValueArgs = {
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MutationSetOpexMkosArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationSetOpexSdfArgs = {
  sdf?: Maybe<Scalars['Boolean']>;
};

export type MutationChangeOpexMkosArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationCreateOpexMkosExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationChangeOpexMkosExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationDeleteOpexMkosExpenseArgs = {
  expenseId: Scalars['ID'];
};

export type MutationSetOpexMkosExpenseYearValueArgs = {
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MutationCreateOpexCaseArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationChangeOpexCaseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type MutationDeleteOpexCaseArgs = {
  caseId: Scalars['ID'];
};

export type MutationCreateOpexCaseExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationChangeOpexCaseExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationDeleteOpexCaseExpenseArgs = {
  caseId: Scalars['ID'];
  expenseId: Scalars['ID'];
};

export type MutationSetOpexCaseExpenseYearValueArgs = {
  caseId: Scalars['ID'];
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MutationCreateCapexExpenseGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type MutationChangeCapexExpenseGroupArgs = {
  capexExpenseGroupId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type MutationDeleteCapexExpenseGroupArgs = {
  capexExpenseGroupId?: Maybe<Scalars['ID']>;
};

export type MutationSetCapexExpenseYearValueArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MutationCreateCapexExpenseArgs = {
  capexExpenseGroupId?: Maybe<Scalars['ID']>;
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationChangeCapexExpenseArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationDeleteCapexExpenseArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
};

export type MutationCreateCapexGlobalValueArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationUpdateCapexGlobalValueArgs = {
  capexGlobalValueId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MutationDeleteCapexGlobalValueArgs = {
  capexGlobalValueId: Scalars['ID'];
};

export type MutationCreateCapexArgs = {
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

/** Мутации данных ресурсной базы. */
export type ResourceBaseMutations = {
  __typename?: 'ResourceBaseMutations';
  updateRiskValue?: Maybe<UpdateRiskValueResult>;
  calculateProject?: Maybe<CalculatedOrError>;
  saveProject?: Maybe<SavedOrError>;
};

/** Мутации данных ресурсной базы. */
export type ResourceBaseMutationsUpdateRiskValueArgs = {
  projectStructure: ProjectStructureInput;
};

/** Мутации данных ресурсной базы. */
export type ResourceBaseMutationsCalculateProjectArgs = {
  projectInput: RbProjectInput;
};

/** Мутации данных ресурсной базы. */
export type ResourceBaseMutationsSaveProjectArgs = {
  projectInput: RbProjectInput;
};

export type UpdateRiskValueResult = GCoSCalculationResult | DetailError;

export type GCoSCalculationResult = {
  __typename?: 'GCoSCalculationResult';
  /** Список значений GCoS геологических объектов */
  GCoSValues?: Maybe<Array<Maybe<Scalars['Float']>>>;
  errors?: Maybe<Array<TableError>>;
};

/** Ошибка данных таблицы с информацией о расположении строк или ячеек повлекших ошибку. */
export type TableError = RbErrorInterface & {
  __typename?: 'TableError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: RbErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  /** Имя таблицы, содержащей строки или ячейки, повлекшие ошибку */
  tableName: TableNames;
  /** Индекс ячейки в строке таблицы, повлекшей ошибку */
  column?: Maybe<Scalars['Int']>;
  /** Индекс строки таблицы, повлекшей ошибку */
  row?: Maybe<Scalars['Int']>;
};

/** Имена таблиц в структуре проекта. */
export enum TableNames {
  Conceptions = 'CONCEPTIONS',
  DomainEntities = 'DOMAIN_ENTITIES',
  Attributes = 'ATTRIBUTES',
  Risks = 'RISKS',
}

export type CalculatedOrError =
  | CalculationResult
  | TableErrors
  | DistributionDefinitionErrors;

export type CalculationResult = {
  __typename?: 'CalculationResult';
  /** Архив с результатом вычислений. Доступен по url /calculation_result/<resultId> */
  resultId?: Maybe<Scalars['ID']>;
};

export type TableErrors = {
  __typename?: 'TableErrors';
  errors: Array<TableError>;
};

/** Результат сохранения проекта. */
export type SavedOrError =
  | SavingResult
  | TableErrors
  | DistributionDefinitionErrors;

/** Успешное сохранение проекта. */
export type SavingResult = {
  __typename?: 'SavingResult';
  /** UUID сохранённого проекта */
  projectId?: Maybe<Scalars['ID']>;
};

export type LogicMutations = {
  __typename?: 'LogicMutations';
  scenarioStep?: Maybe<ScenarioStepMutations>;
  canvas?: Maybe<CanvasMutations>;
};

export type ScenarioStepMutations = {
  __typename?: 'ScenarioStepMutations';
  create?: Maybe<CreateScenarioStep>;
  update?: Maybe<UpdateScenarioStep>;
  delete?: Maybe<DeleteScenarioStep>;
  itemEffects?: Maybe<ActivityEffectMutations>;
};

export type ScenarioStepMutationsCreateArgs = {
  activity: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  objectGroup?: Maybe<Scalars['UUID']>;
  objects?: Maybe<Array<Maybe<Scalars['UUID']>>>;
};

export type ScenarioStepMutationsUpdateArgs = {
  activity: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  objectGroup?: Maybe<Scalars['UUID']>;
  objects?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  vid: Scalars['UUID'];
};

export type ScenarioStepMutationsDeleteArgs = {
  vid: Scalars['UUID'];
};

export type CreateScenarioStep = {
  __typename?: 'CreateScenarioStep';
  result?: Maybe<ScenarioStep>;
};

export type UpdateScenarioStep = {
  __typename?: 'UpdateScenarioStep';
  result?: Maybe<ScenarioStep>;
};

export type DeleteScenarioStep = {
  __typename?: 'DeleteScenarioStep';
  ok?: Maybe<Scalars['Boolean']>;
};

export type ActivityEffectMutations = {
  __typename?: 'ActivityEffectMutations';
  create?: Maybe<CreateActivityEffect>;
  update?: Maybe<UpdateActivityEffect>;
  delete?: Maybe<DeleteActivityEffect>;
};

export type ActivityEffectMutationsCreateArgs = {
  code?: Maybe<Scalars['String']>;
  formula?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  stepItemVid: Scalars['UUID'];
  stepVid: Scalars['UUID'];
  trigger?: Maybe<Scalars['String']>;
  vid?: Maybe<Scalars['UUID']>;
};

export type ActivityEffectMutationsUpdateArgs = {
  code?: Maybe<Scalars['String']>;
  formula?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  stepItemVid: Scalars['UUID'];
  stepVid: Scalars['UUID'];
  trigger?: Maybe<Scalars['String']>;
  vid: Scalars['UUID'];
};

export type ActivityEffectMutationsDeleteArgs = {
  stepItemVid: Scalars['UUID'];
  stepVid: Scalars['UUID'];
  vid: Scalars['UUID'];
};

export type CreateActivityEffect = {
  __typename?: 'CreateActivityEffect';
  result?: Maybe<ActivityEffect>;
};

export type UpdateActivityEffect = {
  __typename?: 'UpdateActivityEffect';
  result?: Maybe<ActivityEffect>;
};

export type DeleteActivityEffect = {
  __typename?: 'DeleteActivityEffect';
  ok?: Maybe<Scalars['Boolean']>;
};

export type CanvasMutations = {
  __typename?: 'CanvasMutations';
  create?: Maybe<CreateCanvasNode>;
  update?: Maybe<UpdateCanvasNode>;
  delete?: Maybe<DeleteCanvasNode>;
};

export type CanvasMutationsCreateArgs = {
  childrenVids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  code?: Maybe<Scalars['String']>;
  nodeRef?: Maybe<Scalars['UUID']>;
  nodeType: Scalars['String'];
  parentVids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  position?: Maybe<Array<Maybe<Scalars['Float']>>>;
  title?: Maybe<Scalars['String']>;
  vid?: Maybe<Scalars['UUID']>;
  width?: Maybe<Scalars['Float']>;
};

export type CanvasMutationsUpdateArgs = {
  childrenVids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  code?: Maybe<Scalars['String']>;
  nodeRef?: Maybe<Scalars['UUID']>;
  nodeType?: Maybe<Scalars['String']>;
  parentVids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  position?: Maybe<Array<Maybe<Scalars['Float']>>>;
  title?: Maybe<Scalars['String']>;
  vid: Scalars['UUID'];
  width?: Maybe<Scalars['Float']>;
};

export type CanvasMutationsDeleteArgs = {
  vid: Scalars['UUID'];
};

export type CreateCanvasNode = {
  __typename?: 'CreateCanvasNode';
  result?: Maybe<CanvasNode>;
};

export type UpdateCanvasNode = {
  __typename?: 'UpdateCanvasNode';
  result?: Maybe<CanvasNode>;
};

export type DeleteCanvasNode = {
  __typename?: 'DeleteCanvasNode';
  ok?: Maybe<Scalars['Boolean']>;
};

export type ScenarioCreateMutation = {
  __typename?: 'ScenarioCreateMutation';
  scenario?: Maybe<ScenarioOrError>;
};

export type ScenarioOrError = ScenarioType | Error;

export type ScenarioUpdateMutation = {
  __typename?: 'ScenarioUpdateMutation';
  scenario?: Maybe<ScenarioOrError>;
};

export type ProductTypeInput = {
  /** Название вида продукции */
  name: Scalars['String'];
  /** Цена реализации */
  netback?: Maybe<NetbackPriceInput>;
  /** Список продукции */
  products?: Maybe<Array<Maybe<ProductInput>>>;
};

/** Значение цены реализации относительно года. */
export type NetbackPriceInput = {
  /** Название */
  name: Scalars['String'];
  /** Цены */
  prices: Array<Maybe<AverageAnnualPriceInput>>;
  /** Тип нэтбэка (ДНС или НДД) */
  netbackType: Scalars['String'];
};

/** Значение цены относительно года. */
export type AverageAnnualPriceInput = {
  /** Год */
  year: Scalars['Int'];
  /** Цена */
  price: Scalars['Float'];
  /** Единицы измерения */
  units?: Maybe<Scalars['String']>;
};

export type ProductInput = {
  /** Название продукта */
  name: Scalars['String'];
  /** Список связанных цен */
  prices: Array<Maybe<AverageAnnualPriceInput>>;
};

export type ScenarioDeleteMutation = {
  __typename?: 'ScenarioDeleteMutation';
  result?: Maybe<UuidOrError>;
};

export type UuidOrError = Result | Error;

export type Result = {
  __typename?: 'Result';
  vid?: Maybe<Scalars['ID']>;
};

export type CreateNetback = {
  __typename?: 'CreateNetback';
  netback?: Maybe<NetbackPriceOrError>;
};

export type NetbackPriceOrError = NetbackPriceType | Error;

export type AverageAnnualPriceTypeInput = {
  /** Год */
  year?: Maybe<Scalars['Int']>;
  /** Цена */
  price?: Maybe<Scalars['Float']>;
};

export type UpdateNetback = {
  __typename?: 'UpdateNetback';
  netback?: Maybe<NetbackPriceOrError>;
};

export type DeleteNetback = {
  __typename?: 'DeleteNetback';
  result?: Maybe<UuidOrError>;
};

export type CreateProductType = {
  __typename?: 'CreateProductType';
  productType?: Maybe<ProductTypeOrError>;
};

export type ProductTypeOrError = ProductType | Error;

export type UpdateProductType = {
  __typename?: 'UpdateProductType';
  productType?: Maybe<ProductTypeOrError>;
};

export type DeleteProductType = {
  __typename?: 'DeleteProductType';
  result?: Maybe<UuidOrError>;
};

export type CreateProduct = {
  __typename?: 'CreateProduct';
  product?: Maybe<ProductOrError>;
};

export type ProductOrError = Product | Error;

export type UpdateProduct = {
  __typename?: 'UpdateProduct';
  product?: Maybe<ProductOrError>;
};

export type DeleteProduct = {
  __typename?: 'DeleteProduct';
  result?: Maybe<UuidOrError>;
};

export type CreateMacroparameterSet = {
  __typename?: 'CreateMacroparameterSet';
  macroparameterSet?: Maybe<MacroparameterSetOrError>;
};

export type ChangeMacroparameterSet = {
  __typename?: 'ChangeMacroparameterSet';
  macroparameterSet?: Maybe<MacroparameterSetOrError>;
};

export type DeleteMacroparameterSet = {
  __typename?: 'DeleteMacroparameterSet';
  result?: Maybe<UuidOrError>;
};

export type CreateMacroparameterGroup = {
  __typename?: 'CreateMacroparameterGroup';
  macroparameterGroup?: Maybe<MacroparameterGroupOrError>;
};

export type ChangeMacroparameterGroup = {
  __typename?: 'ChangeMacroparameterGroup';
  macroparameterGroup?: Maybe<MacroparameterGroupOrError>;
};

export type DeleteMacroparameterGroup = {
  __typename?: 'DeleteMacroparameterGroup';
  result?: Maybe<UuidOrError>;
};

export type CreateMacroparameter = {
  __typename?: 'CreateMacroparameter';
  macroparameter?: Maybe<MacroparameterOrError>;
};

export type ChangeMacroparameter = {
  __typename?: 'ChangeMacroparameter';
  macroparameter?: Maybe<MacroparameterOrError>;
};

export type ClearMacroparameterValue = {
  __typename?: 'ClearMacroparameterValue';
  macroparameter?: Maybe<MacroparameterOrError>;
};

export type SetMacroparameterYearValue = {
  __typename?: 'SetMacroparameterYearValue';
  macroparameter?: Maybe<MacroparameterOrError>;
};

export type DeleteMacroparameter = {
  __typename?: 'DeleteMacroparameter';
  result?: Maybe<UuidOrError>;
};

export type SetOpexAutoexport = {
  __typename?: 'SetOpexAutoexport';
  autoexport?: Maybe<OpexExpenseGroupOrError>;
};

export type ChangeOpexAutoexport = {
  __typename?: 'ChangeOpexAutoexport';
  autoexport?: Maybe<OpexExpenseGroupOrError>;
};

export type RemoveOpexAutoexport = {
  __typename?: 'RemoveOpexAutoexport';
  error?: Maybe<Error>;
};

export type CreateOpexAutoexportExpense = {
  __typename?: 'CreateOpexAutoexportExpense';
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type ChangeOpexAutoexportExpense = {
  __typename?: 'ChangeOpexAutoexportExpense';
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type DeleteOpexAutoexportExpense = {
  __typename?: 'DeleteOpexAutoexportExpense';
  result?: Maybe<UuidOrError>;
};

export type SetOpexAutoexportExpenseYearValue = {
  __typename?: 'SetOpexAutoexportExpenseYearValue';
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type SetOpexMkos = {
  __typename?: 'SetOpexMkos';
  mkos?: Maybe<OpexExpenseGroupOrError>;
};

export type SetOpexSdf = {
  __typename?: 'SetOpexSdf';
  opexSdf?: Maybe<OpexSdfOrError>;
};

export type OpexSdfOrError = OpexSdf | Error;

export type OpexSdf = {
  __typename?: 'OpexSdf';
  sdf?: Maybe<Scalars['Boolean']>;
};

export type ChangeOpexMkos = {
  __typename?: 'ChangeOpexMkos';
  mkos?: Maybe<OpexExpenseGroupOrError>;
};

export type RemoveOpexMkos = {
  __typename?: 'RemoveOpexMkos';
  error?: Maybe<Error>;
};

export type CreateOpexMkosExpense = {
  __typename?: 'CreateOpexMkosExpense';
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type ChangeOpexMkosExpense = {
  __typename?: 'ChangeOpexMkosExpense';
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type DeleteOpexMkosExpense = {
  __typename?: 'DeleteOpexMkosExpense';
  result?: Maybe<UuidOrError>;
};

export type SetOpexMkosExpenseYearValue = {
  __typename?: 'SetOpexMkosExpenseYearValue';
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type CreateOpexCase = {
  __typename?: 'CreateOpexCase';
  opexCase?: Maybe<OpexExpenseGroupOrError>;
};

export type ChangeOpexCase = {
  __typename?: 'ChangeOpexCase';
  opexCase?: Maybe<OpexExpenseGroupOrError>;
};

export type DeleteOpexCase = {
  __typename?: 'DeleteOpexCase';
  result?: Maybe<UuidOrError>;
};

export type CreateOpexCaseExpense = {
  __typename?: 'CreateOpexCaseExpense';
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type ChangeOpexCaseExpense = {
  __typename?: 'ChangeOpexCaseExpense';
  totalValueByYear?: Maybe<Array<Maybe<OpexYearValue>>>;
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type DeleteOpexCaseExpense = {
  __typename?: 'DeleteOpexCaseExpense';
  result?: Maybe<UuidOrError>;
};

export type SetOpexCaseExpenseYearValue = {
  __typename?: 'SetOpexCaseExpenseYearValue';
  totalValueByYear?: Maybe<Array<Maybe<OpexYearValue>>>;
  opexExpense?: Maybe<OpexExpenseOrError>;
};

export type CreateCapexExpenseGroup = {
  __typename?: 'CreateCapexExpenseGroup';
  capexExpenseGroup?: Maybe<CapexExpenseGroupOrError>;
};

export type ChangeCapexExpenseGroup = {
  __typename?: 'ChangeCapexExpenseGroup';
  capexExpenseGroup?: Maybe<CapexExpenseGroupOrError>;
};

export type DeleteCapexExpenseGroup = {
  __typename?: 'DeleteCapexExpenseGroup';
  result?: Maybe<UuidOrError>;
};

export type SetCapexExpenseYearValue = {
  __typename?: 'SetCapexExpenseYearValue';
  capexExpense?: Maybe<CapexExpenseOrError>;
  totalValueByYear?: Maybe<Array<Maybe<CapexYearValueType>>>;
};

export type CreateCapexExpense = {
  __typename?: 'CreateCapexExpense';
  capexExpense?: Maybe<CapexExpenseOrError>;
};

export type ChangeCapexExpense = {
  __typename?: 'ChangeCapexExpense';
  totalValueByYear?: Maybe<Array<Maybe<CapexYearValueType>>>;
  capexExpense?: Maybe<CapexExpenseOrError>;
};

export type DeleteCapexExpense = {
  __typename?: 'DeleteCapexExpense';
  result?: Maybe<UuidOrError>;
};

export type CreateCapexGlobalValue = {
  __typename?: 'CreateCapexGlobalValue';
  capexGlobalValue?: Maybe<CapexGlobalValueOrError>;
};

export type UpdateCapexGlobalValue = {
  __typename?: 'UpdateCapexGlobalValue';
  capexGlobalValue?: Maybe<CapexGlobalValueOrError>;
};

export type DeleteCapexGlobalValue = {
  __typename?: 'DeleteCapexGlobalValue';
  result?: Maybe<UuidOrError>;
};

export type MacroparameterMutation = {
  __typename?: 'MacroparameterMutation';
  createMacroparameterSet?: Maybe<CreateMacroparameterSet>;
  changeMacroparameterSet?: Maybe<ChangeMacroparameterSet>;
  deleteMacroparameterSet?: Maybe<DeleteMacroparameterSet>;
  createMacroparameterGroup?: Maybe<CreateMacroparameterGroup>;
  changeMacroparameterGroup?: Maybe<ChangeMacroparameterGroup>;
  deleteMacroparameterGroup?: Maybe<DeleteMacroparameterGroup>;
  createMacroparameter?: Maybe<CreateMacroparameter>;
  changeMacroparameter?: Maybe<ChangeMacroparameter>;
  clearMacroparameterValue?: Maybe<ClearMacroparameterValue>;
  setMacroparameterYearValue?: Maybe<SetMacroparameterYearValue>;
  deleteMacroparameter?: Maybe<DeleteMacroparameter>;
};

export type MacroparameterMutationCreateMacroparameterSetArgs = {
  allProjects?: Maybe<Scalars['Boolean']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<MacroparameterSetCategory>;
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type MacroparameterMutationChangeMacroparameterSetArgs = {
  allProjects?: Maybe<Scalars['Boolean']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<MacroparameterSetCategory>;
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type MacroparameterMutationDeleteMacroparameterSetArgs = {
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type MacroparameterMutationCreateMacroparameterGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type MacroparameterMutationChangeMacroparameterGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type MacroparameterMutationDeleteMacroparameterGroupArgs = {
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type MacroparameterMutationCreateMacroparameterArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MacroparameterMutationChangeMacroparameterArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type MacroparameterMutationClearMacroparameterValueArgs = {
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
};

export type MacroparameterMutationSetMacroparameterYearValueArgs = {
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type MacroparameterMutationDeleteMacroparameterArgs = {
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type CapexMutation = {
  __typename?: 'CapexMutation';
  createCapexExpenseGroup?: Maybe<CreateCapexExpenseGroup>;
  changeCapexExpenseGroup?: Maybe<ChangeCapexExpenseGroup>;
  deleteCapexExpenseGroup?: Maybe<DeleteCapexExpenseGroup>;
  setCapexExpenseYearValue?: Maybe<SetCapexExpenseYearValue>;
  createCapexExpense?: Maybe<CreateCapexExpense>;
  changeCapexExpense?: Maybe<ChangeCapexExpense>;
  deleteCapexExpense?: Maybe<DeleteCapexExpense>;
  createCapexGlobalValue?: Maybe<CreateCapexGlobalValue>;
  updateCapexGlobalValue?: Maybe<UpdateCapexGlobalValue>;
  deleteCapexGlobalValue?: Maybe<DeleteCapexGlobalValue>;
};

export type CapexMutationCreateCapexExpenseGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CapexMutationChangeCapexExpenseGroupArgs = {
  capexExpenseGroupId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type CapexMutationDeleteCapexExpenseGroupArgs = {
  capexExpenseGroupId?: Maybe<Scalars['ID']>;
};

export type CapexMutationSetCapexExpenseYearValueArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type CapexMutationCreateCapexExpenseArgs = {
  capexExpenseGroupId?: Maybe<Scalars['ID']>;
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type CapexMutationChangeCapexExpenseArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type CapexMutationDeleteCapexExpenseArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
};

export type CapexMutationCreateCapexGlobalValueArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type CapexMutationUpdateCapexGlobalValueArgs = {
  capexGlobalValueId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type CapexMutationDeleteCapexGlobalValueArgs = {
  capexGlobalValueId: Scalars['ID'];
};

export type OpexMutation = {
  __typename?: 'OpexMutation';
  setOpexAutoexport?: Maybe<SetOpexAutoexport>;
  changeOpexAutoexport?: Maybe<ChangeOpexAutoexport>;
  removeOpexAutoexport?: Maybe<RemoveOpexAutoexport>;
  createOpexAutoexportExpense?: Maybe<CreateOpexAutoexportExpense>;
  changeOpexAutoexportExpense?: Maybe<ChangeOpexAutoexportExpense>;
  deleteOpexAutoexportExpense?: Maybe<DeleteOpexAutoexportExpense>;
  setOpexAutoexportExpenseYearValue?: Maybe<SetOpexAutoexportExpenseYearValue>;
  setOpexMkos?: Maybe<SetOpexMkos>;
  setOpexSdf?: Maybe<SetOpexSdf>;
  changeOpexMkos?: Maybe<ChangeOpexMkos>;
  removeOpexMkos?: Maybe<RemoveOpexMkos>;
  createOpexMkosExpense?: Maybe<CreateOpexMkosExpense>;
  changeOpexMkosExpense?: Maybe<ChangeOpexMkosExpense>;
  deleteOpexMkosExpense?: Maybe<DeleteOpexMkosExpense>;
  setOpexMkosExpenseYearValue?: Maybe<SetOpexMkosExpenseYearValue>;
  createOpexCase?: Maybe<CreateOpexCase>;
  changeOpexCase?: Maybe<ChangeOpexCase>;
  deleteOpexCase?: Maybe<DeleteOpexCase>;
  createOpexCaseExpense?: Maybe<CreateOpexCaseExpense>;
  changeOpexCaseExpense?: Maybe<ChangeOpexCaseExpense>;
  deleteOpexCaseExpense?: Maybe<DeleteOpexCaseExpense>;
  setOpexCaseExpenseYearValue?: Maybe<SetOpexCaseExpenseYearValue>;
};

export type OpexMutationSetOpexAutoexportArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type OpexMutationChangeOpexAutoexportArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type OpexMutationCreateOpexAutoexportExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type OpexMutationChangeOpexAutoexportExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type OpexMutationDeleteOpexAutoexportExpenseArgs = {
  expenseId: Scalars['ID'];
};

export type OpexMutationSetOpexAutoexportExpenseYearValueArgs = {
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type OpexMutationSetOpexMkosArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type OpexMutationSetOpexSdfArgs = {
  sdf?: Maybe<Scalars['Boolean']>;
};

export type OpexMutationChangeOpexMkosArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type OpexMutationCreateOpexMkosExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type OpexMutationChangeOpexMkosExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type OpexMutationDeleteOpexMkosExpenseArgs = {
  expenseId: Scalars['ID'];
};

export type OpexMutationSetOpexMkosExpenseYearValueArgs = {
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type OpexMutationCreateOpexCaseArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type OpexMutationChangeOpexCaseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type OpexMutationDeleteOpexCaseArgs = {
  caseId: Scalars['ID'];
};

export type OpexMutationCreateOpexCaseExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type OpexMutationChangeOpexCaseExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type OpexMutationDeleteOpexCaseExpenseArgs = {
  caseId: Scalars['ID'];
  expenseId: Scalars['ID'];
};

export type OpexMutationSetOpexCaseExpenseYearValueArgs = {
  caseId: Scalars['ID'];
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type ScenarioMutation = {
  __typename?: 'ScenarioMutation';
  createScenario?: Maybe<ScenarioCreateMutation>;
  updateScenario?: Maybe<ScenarioUpdateMutation>;
  deleteScenario?: Maybe<ScenarioDeleteMutation>;
  createNetback?: Maybe<CreateNetback>;
  updateNetback?: Maybe<UpdateNetback>;
  deleteNetback?: Maybe<DeleteNetback>;
  createProductType?: Maybe<CreateProductType>;
  updateProductType?: Maybe<UpdateProductType>;
  deleteProductType?: Maybe<DeleteProductType>;
  createProduct?: Maybe<CreateProduct>;
  updateProduct?: Maybe<UpdateProduct>;
  deleteProduct?: Maybe<DeleteProduct>;
};

export type ScenarioMutationCreateScenarioArgs = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ScenarioMutationUpdateScenarioArgs = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productTypes?: Maybe<Array<Maybe<ProductTypeInput>>>;
  scenarioId: Scalars['ID'];
};

export type ScenarioMutationDeleteScenarioArgs = {
  scenarioId: Scalars['ID'];
};

export type ScenarioMutationCreateNetbackArgs = {
  netbackName: Scalars['String'];
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ScenarioMutationUpdateNetbackArgs = {
  netbackName?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ScenarioMutationDeleteNetbackArgs = {
  netbackName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type ScenarioMutationCreateProductTypeArgs = {
  fareAllow?: Maybe<Scalars['Boolean']>;
  productTypeName: Scalars['String'];
  qualityAward?: Maybe<Scalars['Float']>;
  qualityDiscount?: Maybe<Scalars['Float']>;
  scenarioId: Scalars['ID'];
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ScenarioMutationUpdateProductTypeArgs = {
  fareAllow?: Maybe<Scalars['Boolean']>;
  productTypeId: Scalars['ID'];
  productTypeName?: Maybe<Scalars['String']>;
  qualityAward?: Maybe<Scalars['Float']>;
  qualityDiscount?: Maybe<Scalars['Float']>;
  scenarioId: Scalars['ID'];
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ScenarioMutationDeleteProductTypeArgs = {
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type ScenarioMutationCreateProductArgs = {
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
};

export type ScenarioMutationUpdateProductArgs = {
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productName?: Maybe<Scalars['String']>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
};

export type ScenarioMutationDeleteProductArgs = {
  productName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type CreateCapex = {
  __typename?: 'CreateCapex';
  capex?: Maybe<CapexOrError>;
};

export type DomainMutations = {
  __typename?: 'DomainMutations';
  geoEconomicAppraisalProject?: Maybe<GeoEconomicAppraisalProjectMutations>;
  object?: Maybe<DomainObjectMutations>;
  objectGroup?: Maybe<DomainObjectGroupMutations>;
};

export type GeoEconomicAppraisalProjectMutations = {
  __typename?: 'GeoEconomicAppraisalProjectMutations';
  create?: Maybe<GeoEconomicAppraisalProject_Type>;
  update?: Maybe<GeoEconomicAppraisalProject_Type>;
};

export type GeoEconomicAppraisalProjectMutationsCreateArgs = {
  name?: Maybe<Scalars['String']>;
};

export type GeoEconomicAppraisalProjectMutationsUpdateArgs = {
  vid: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
};

export type DomainObjectMutations = {
  __typename?: 'DomainObjectMutations';
  delete?: Maybe<DeleteDomainObjectMutation>;
};

export type DomainObjectMutationsDeleteArgs = {
  vid?: Maybe<Scalars['UUID']>;
};

export type DeleteDomainObjectMutation = {
  __typename?: 'DeleteDomainObjectMutation';
  ok?: Maybe<Scalars['Boolean']>;
};

export type DomainObjectGroupMutations = {
  __typename?: 'DomainObjectGroupMutations';
  create?: Maybe<CreateDomainGroupResult>;
  update?: Maybe<UpdateDomainGroupResult>;
  delete?: Maybe<DeleteDomainGroupResult>;
};

export type DomainObjectGroupMutationsCreateArgs = {
  formula?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  vids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
};

export type DomainObjectGroupMutationsUpdateArgs = {
  formula?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  vid: Scalars['UUID'];
  vids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
};

export type DomainObjectGroupMutationsDeleteArgs = {
  vid: Scalars['UUID'];
};

export type CreateDomainGroupResult = {
  __typename?: 'CreateDomainGroupResult';
  ok?: Maybe<Scalars['Boolean']>;
  vid?: Maybe<Scalars['UUID']>;
  vids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  formula?: Maybe<Scalars['String']>;
};

export type UpdateDomainGroupResult = {
  __typename?: 'UpdateDomainGroupResult';
  ok?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  vids?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  formula?: Maybe<Scalars['String']>;
};

export type DeleteDomainGroupResult = {
  __typename?: 'DeleteDomainGroupResult';
  ok?: Maybe<Scalars['Boolean']>;
};
