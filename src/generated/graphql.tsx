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

export type Query = {
  __typename?: 'Query';
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
  domainEntities: Array<DomainEntity>;
  /** Список подсчетных параметров */
  attributes: Array<Attribute>;
  /** Список рисков геологических объектов */
  risks: Array<Risk>;
};

export type DomainEntity = {
  __typename?: 'DomainEntity';
  /** Имя доменной сущности геологического объекта */
  name: Scalars['String'];
  /** Иконка доменной сущности геологического объекта */
  icon: DomainEntityIcons;
};

/** Список иконок доменной сущности геологического объекта. */
export enum DomainEntityIcons {
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
export type DetailError = ErrorInterface & {
  __typename?: 'DetailError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  /** Детальная информация об ошибке */
  details?: Maybe<Scalars['String']>;
};

/** Интерфейс ошибок, отображаемых пользователю. */
export type ErrorInterface = {
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
};

/** Список кодов ошибок приложения. */
export enum ErrorCodes {
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
}

export type ProjectInput = {
  /** Версия шаблона структуры проекта */
  version: Scalars['String'];
  /** Структура проекта */
  structure: ProjectStructureInput;
};

export type ProjectStructureInput = {
  /** Список доменных сущностей геологических объектов */
  domainEntities: Array<DomainEntityInput>;
  /** Список подсчетных параметров */
  attributes: Array<AttributeInput>;
  /** Список геологических объектов структуры проекта */
  domainObjects: Array<DomainObjectInput>;
  /** Список рисков геологических объектов */
  risks: Array<RiskInput>;
};

export type DomainEntityInput = {
  /** Имя доменной сущности геологического объекта */
  name: Scalars['String'];
  /** Иконка доменной сущности геологического объекта */
  icon: DomainEntityIcons;
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
  /** Через квантили */
  Quantiles = 'QUANTILES',
  /** Через альфа, бета, минимум и максимум */
  AlphaBetaMinMax = 'ALPHA_BETA_MIN_MAX',
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
  /** Мин. */
  Min = 'MIN',
  /** Макс. */
  Max = 'MAX',
  /** Расположение */
  Location = 'LOCATION',
  /** Наиболее вероятное */
  Mode = 'MODE',
  /** Логарифмическое среднее */
  Meanlog = 'MEANLOG',
  /** Логарифмическое стандартное отклонение */
  Sdlog = 'SDLOG',
  /** q1_rank */
  Q1Rank = 'Q1_RANK',
  /** q1_value */
  Q1Value = 'Q1_VALUE',
  /** q2_rank */
  Q2Rank = 'Q2_RANK',
  /** q2_value */
  Q2Value = 'Q2_VALUE',
  /** Параметр расположения Альфа */
  Alpha = 'ALPHA',
  /** Параметр расположения Бэта */
  Beta = 'BETA',
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
export type DistributionDefinitionError = ErrorInterface & {
  __typename?: 'DistributionDefinitionError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  /** Список параметров задания распределения, к которым относится ошибка */
  fields: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateRiskValue?: Maybe<UpdateRiskValueResult>;
  calculateProject?: Maybe<CalculationResult>;
};

export type MutationUpdateRiskValueArgs = {
  projectStructure: ProjectStructureInput;
};

export type MutationCalculateProjectArgs = {
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
export type TableError = ErrorInterface & {
  __typename?: 'TableError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
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
