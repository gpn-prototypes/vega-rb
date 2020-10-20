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
  template?: Maybe<Project>;
  /** Валидация структуры проекта перед импортом/экспортом */
  validateBeforeLoad?: Maybe<DetailError>;
};

/** Пространство имен для работы с проектом. */
export type ProjectQueriesValidateBeforeLoadArgs = {
  project: ProjectInput;
};

export type Project = {
  __typename?: 'Project';
  /** Версия шаблона структуры проекта */
  version: Scalars['String'];
  /** Структура проекта */
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
}

export type ProjectInput = {
  /** Версия шаблона структуры проекта */
  version: Scalars['String'];
  /** Структура проекта */
  structure: ProjectStructureInput;
};

export type ProjectStructureInput = {
  /** Список доменных сущностей геологических объектов */
  domainEntities: Array<RbDomainEntityInput>;
  /** Список подсчетных параметров */
  attributes: Array<AttributeInput>;
  /** Список геологических объектов структуры проекта */
  domainObjects: Array<DomainObjectInput>;
  /** Список рисков геологических объектов */
  risks: Array<RiskInput>;
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

/** Геологический объект структуры проекта. */
export type DomainObjectInput = {
  /** Иерархия геологического объекта в структуре проекта */
  domainObjectPath: Array<Scalars['String']>;
  /** Категория геологического объекта */
  geoObjectCategory: GeoObjectCategories;
  /** Список значений атрибутов геологического объекта */
  attributeValues: Array<Maybe<DistributionInput>>;
  /** Список значений рисков геологического объекта */
  risksValues: Array<Maybe<Scalars['Float']>>;
};

/** Список категорий геологического объекта. */
export enum GeoObjectCategories {
  Reserves = 'RESERVES',
  Resources = 'RESOURCES',
}

/** Параметры распределения. */
export type DistributionInput = {
  /** Тип распределения */
  type: DistributionTypes;
  /** Способ задания распределения */
  definition: DistributionDefinitionTypes;
  /** Параметры распределения */
  parameters: Array<Maybe<DistributionParameterInput>>;
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
  LocationMeanlogSdlog = 'LOCATION_MEANLOG_SDLOG',
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
export type DistributionParameterInput = {
  /** Тип параметра распределения */
  type: DistributionParameterTypes;
  value: Scalars['Float'];
};

/** Тип параметра задания распределения. */
export enum DistributionParameterTypes {
  /** Среднее */
  Mean = 'MEAN',
  /** Стандартное отклонение */
  StandardDeviation = 'STANDARD_DEVIATION',
  /** Минимум */
  Min = 'MIN',
  /** Максимум */
  Max = 'MAX',
  /** Расположение */
  Location = 'LOCATION',
  /** Наиболее вероятное */
  Mode = 'MODE',
  /** Логарифмическое среднее */
  Meanlog = 'MEANLOG',
  /** Логарифмическое стандартное отклонение */
  Sdlog = 'SDLOG',
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

export type RiskInput = {
  /** Кодовое обозначение риска */
  code: Scalars['String'];
  /** Наименование риска */
  name: Scalars['String'];
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

/** Мутации данных ресурсной базы. */
export type ResourceBaseMutations = {
  __typename?: 'ResourceBaseMutations';
  updateRiskValue?: Maybe<UpdateRiskValueResult>;
  calculateProject?: Maybe<CalculationResult>;
};

/** Мутации данных ресурсной базы. */
export type ResourceBaseMutationsUpdateRiskValueArgs = {
  projectStructure: ProjectStructureInput;
};

/** Мутации данных ресурсной базы. */
export type ResourceBaseMutationsCalculateProjectArgs = {
  projectStructureInput: ProjectStructureInput;
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
  DomainEntities = 'DOMAIN_ENTITIES',
  Attributes = 'ATTRIBUTES',
  Risks = 'RISKS',
}

export type CalculationResult =
  | TableErrors
  | CalculationOk
  | DistributionDefinitionErrors;

export type TableErrors = {
  __typename?: 'TableErrors';
  errors: Array<TableError>;
};

export type CalculationOk = {
  __typename?: 'CalculationOk';
  /** Архив с результатом вычислений. Доступен по url /calculation_result/<resultId> */
  resultId?: Maybe<Scalars['ID']>;
};
