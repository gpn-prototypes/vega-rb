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
  /** Пространство имен для работы со распределениями. */
  distribution?: Maybe<DistributionQueries>;
};

/** Пространство имен для работы с проектом. */
export type ProjectQueries = {
  __typename?: 'ProjectQueries';
  /** Шаблон структуры проекта */
  template?: Maybe<Project>;
  /** Валидация структуры проекта перед импортом/экспортом */
  validateBeforeLoad?: Maybe<DetailError>;
  /** Валидация данных структуры проекта перед вычислениями */
  validateBeforeCalculate?: Maybe<Array<Maybe<TableError>>>;
};

/** Пространство имен для работы с проектом. */
export type ProjectQueriesValidateBeforeLoadArgs = {
  project: ProjectInput;
};

/** Пространство имен для работы с проектом. */
export type ProjectQueriesValidateBeforeCalculateArgs = {
  projectStructure: ProjectStructureInput;
};

/** Представление проекта. */
export type Project = {
  __typename?: 'Project';
  /** Версия шаблона структуры проекта */
  version: Scalars['String'];
  /** Структуры проекта */
  structure: ProjectStructure;
};

/** Структура проекта. */
export type ProjectStructure = {
  __typename?: 'ProjectStructure';
  /** Список доменных сущностей геологических объектов */
  domainEntities: Array<DomainEntity>;
  /** Список подсчетных параметров */
  calculationParameters: Array<CalculationParameter>;
  /** Список рисков геологических объектов */
  risks: Array<Risk>;
};

/** Доменная сущность геологического объекта. */
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

/** Подсчетный параметр проекта. */
export type CalculationParameter = {
  __typename?: 'CalculationParameter';
  /** Кодовое обозначение подсчетного параметра */
  code: Scalars['String'];
  /** Имя подсчетного параметра */
  name: Scalars['String'];
  /** Сокращенное имя или обозначение подсчетного парметра */
  shortName: Scalars['String'];
  /** Единицы измерения подсчетного параметра */
  units: Scalars['String'];
};

/** Риск геологического объекта. */
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
  /** Шаг не может быть отрицательным */
  StepIsNegative = 'STEP_IS_NEGATIVE',
  /** Минимальное значение не должно быть больше максимального */
  MinGreaterThanMax = 'MIN_GREATER_THAN_MAX',
  /** Ошибка в загружаемой структуре */
  IncorrectProjectStructure = 'INCORRECT_PROJECT_STRUCTURE',
  /** В строке данных таблицы не может быть пустых ячеек */
  EmptyCellInTableData = 'EMPTY_CELL_IN_TABLE_DATA',
  /** В таблице не может быть одинаковых строк */
  IdenticalRowInTableData = 'IDENTICAL_ROW_IN_TABLE_DATA',
  /** Версия импортируемого файла не соответствует версии приложения */
  IncorrectFileVersion = 'INCORRECT_FILE_VERSION',
  /** Стандартное отклонение должно быть положительным */
  StandardDeviationMustBePositive = 'STANDARD_DEVIATION_MUST_BE_POSITIVE',
}

/** Представление проекта. */
export type ProjectInput = {
  /** Версия шаблона структуры проекта */
  version: Scalars['String'];
  /** Структура проекта */
  structure: ProjectStructureInput;
};

/** Структура проекта. */
export type ProjectStructureInput = {
  /** Список доменных сущностей геологического объекта */
  domainEntities: Array<DomainEntityInput>;
  /** Список геологических объектов структуры проекта */
  domainObjects: Array<DomainObjectInput>;
};

/** Доменная сущность геологического объекта. */
export type DomainEntityInput = {
  /** Имя доменной сущности геологического объекта */
  name: Scalars['String'];
  /** Иконка доменной сущности геологического объекта */
  icon: DomainEntityIcons;
};

/** Геологический объект структуры проекта. */
export type DomainObjectInput = {
  /** Список ячеек данных геологического объекта */
  cells: Array<Scalars['String']>;
  /** Категория геологического объекта */
  geoObjectCategory: GeoObjectCategories;
};

/** Список категроий геологического объекта. */
export enum GeoObjectCategories {
  Reserves = 'RESERVES',
  Resources = 'RESOURCES',
}

/** Ошибка данных таблицы с информацией о расположении строк или ячеек повлекших ошибку. */
export type TableError = ErrorInterface & {
  __typename?: 'TableError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  /** Индекс ячейки в строке таблицы, повлекшей ошибку */
  column?: Maybe<Scalars['Int']>;
  /** Индекс строки таблицы, повлекшей ошибку */
  row?: Maybe<Scalars['Int']>;
};

/** Пространство имен для работы со распределениями. */
export type DistributionQueries = {
  __typename?: 'DistributionQueries';
  /** Нормальное распределение, заданное через среднее, стандартное отклонение */
  normalByDeviation?: Maybe<DistributionOrErrors>;
  /** Нормальное распределение, заданное через минимум и максимум */
  normalByMinMax?: Maybe<DistributionOrErrors>;
};

/** Пространство имен для работы со распределениями. */
export type DistributionQueriesNormalByDeviationArgs = {
  deviationInput: DeviationInput;
};

/** Пространство имен для работы со распределениями. */
export type DistributionQueriesNormalByMinMaxArgs = {
  borderConditionsInput: BorderConditionsInput;
};

export type DistributionOrErrors = Distribution | FormErrors;

/** Распределение вероятностной величины. */
export type Distribution = {
  __typename?: 'Distribution';
  /** График распределения */
  curve: Array<Point>;
  /** Точки процентилей */
  percentiles: Array<PercentilePoint>;
};

/** Точка на графике. */
export type Point = {
  __typename?: 'Point';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

/** Точка процентиля на графике. */
export type PercentilePoint = {
  __typename?: 'PercentilePoint';
  point: Point;
  /** Процентный ранг */
  percentRank: Scalars['Int'];
};

/** Ошибки формы, отображаемые пользователю. */
export type FormErrors = {
  __typename?: 'FormErrors';
  errors: Array<FormError>;
};

/** Ошибка при заполнении формы. */
export type FormError = ErrorInterface & {
  __typename?: 'FormError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  /** Список полей формы, к которым относится ошибка */
  fields: Array<Scalars['String']>;
};

/**
 * Способ задания распределения через среднее, стандартное отклонение.
 *
 * Attributes:
 *     mean: Mean or expectation
 *             -inf < mean < inf
 *     standard_deviation: Standard deviation
 *             standard_deviation > 0
 * Raises:
 *     FormErrorsException
 */
export type DeviationInput = {
  /** Среднее значение */
  mean: Scalars['Float'];
  /** Стандартное отклонение */
  standardDeviation: Scalars['Float'];
};

/**
 * Способ задания распределения через минимум и максимум.
 *
 * Args:
 *     min: The starting value of the sequence
 *     max: The end value of the sequence
 * Raises:
 *     FormErrorsException
 */
export type BorderConditionsInput = {
  /** Минимальное */
  min: Scalars['Float'];
  /** Максимальное */
  max: Scalars['Float'];
};
