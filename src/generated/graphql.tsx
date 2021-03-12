/* Generated file via graphql codegen. Do not edit manually */
/* eslint-disable */
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
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: any;
  /**
   * Leverages the internal Python implmeentation of UUID (uuid.UUID) to provide native UUID objects
   * in fields, resolvers and input.
   */
  UUID: any;
  DictType: any;
};

export type Query = {
  __typename?: 'Query';
  /** Актуальная версия текущего проекта */
  version?: Maybe<Scalars['Int']>;
  project?: Maybe<ProjectInner>;
};

/** Проектные данные. */
export type ProjectInner = {
  __typename?: 'ProjectInner';
  isFavorite?: Maybe<Scalars['Boolean']>;
  attendeesTotal?: Maybe<Scalars['Int']>;
  filesTotal?: Maybe<Scalars['Int']>;
  files?: Maybe<Array<Maybe<Attachment>>>;
  attendees?: Maybe<Array<Maybe<Attendee>>>;
  domainSchema?: Maybe<DomainSchema>;
  versions: Array<Maybe<Scalars['Int']>>;
  myRoles?: Maybe<Array<Maybe<ProjectRole>>>;
  recentlyEdited: Scalars['Boolean'];
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  type?: Maybe<ProjectTypeEnum>;
  createdBy?: Maybe<User>;
  editedBy?: Maybe<User>;
  adId?: Maybe<Scalars['String']>;
  authorOu?: Maybe<OrganizationUnit>;
  region?: Maybe<Region>;
  coordinates?: Maybe<Scalars['String']>;
  coordinateSystem?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  rootEntity?: Maybe<Scalars['String']>;
  status?: Maybe<ProjectStatusEnum>;
  resourceId?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  yearEnd?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['Int']>;
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

/** Проектные данные. */
export type ProjectInnerAttendeesArgs = {
  orderBy?: Maybe<Array<Maybe<AttendeeOrderBy>>>;
  sortBy?: Maybe<SortType>;
};

/** Проектные данные. */
export type ProjectInnerScenarioArgs = {
  version?: Maybe<Scalars['Int']>;
};

/** Проектные данные. */
export type ProjectInnerMacroparameterSetArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  caption?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['Int']>;
};

/** Проектные данные. */
export type ProjectInnerMacroparameterSetListArgs = {
  version?: Maybe<Scalars['Int']>;
};

/** Проектные данные. */
export type ProjectInnerOpexArgs = {
  version?: Maybe<Scalars['Int']>;
};

/** Проектные данные. */
export type ProjectInnerCapexArgs = {
  version?: Maybe<Scalars['Int']>;
};

export type Attachment = {
  __typename?: 'Attachment';
  extension?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  createdBy?: Maybe<User>;
  editedBy?: Maybe<User>;
  comment?: Maybe<Scalars['String']>;
  category?: Maybe<AttachmentType>;
  contentType?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
  projectId?: Maybe<Scalars['ID']>;
  size?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  name?: Maybe<Scalars['String']>;
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  login?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  patronym?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  adId?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  favoriteProjects?: Maybe<Array<Maybe<Scalars['ID']>>>;
  organizationUnits?: Maybe<Array<Maybe<OrganizationUnit>>>;
  groups?: Maybe<Array<Maybe<UserGroup>>>;
  customSettings?: Maybe<UserCustomSettings>;
};

export type OrganizationUnit = {
  __typename?: 'OrganizationUnit';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  parentOu?: Maybe<OrganizationUnit>;
  adId?: Maybe<Scalars['String']>;
};

export type Organization = {
  __typename?: 'Organization';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type UserGroup = {
  __typename?: 'UserGroup';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  project?: Maybe<Scalars['ID']>;
};

export type UserCustomSettings = {
  __typename?: 'UserCustomSettings';
  projectList?: Maybe<ProjectListSortingSetting>;
};

export type ProjectListSortingSetting = {
  __typename?: 'ProjectListSortingSetting';
  orderBy?: Maybe<ProjectOrderByEnum>;
  sortBy?: Maybe<SortTypeEnum>;
};

/** An enumeration. */
export enum ProjectOrderByEnum {
  IsFavorite = 'IS_FAVORITE',
  Name = 'NAME',
  Description = 'DESCRIPTION',
  Region = 'REGION',
  CreatedBy = 'CREATED_BY',
  CreatedAt = 'CREATED_AT',
  EditedBy = 'EDITED_BY',
  EditedAt = 'EDITED_AT',
}

/** An enumeration. */
export enum SortTypeEnum {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type AttachmentType = {
  __typename?: 'AttachmentType';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

export type Attendee = {
  __typename?: 'Attendee';
  user?: Maybe<User>;
  roles?: Maybe<Array<Maybe<ProjectRole>>>;
  status?: Maybe<AttendeeStatus>;
};

export type ProjectRole = {
  __typename?: 'ProjectRole';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  defaultAttachmentType?: Maybe<AttachmentType>;
};

export enum AttendeeStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum AttendeeOrderBy {
  FirstName = 'FIRST_NAME',
  Patronym = 'PATRONYM',
  LastName = 'LAST_NAME',
  Name = 'NAME',
  Role = 'ROLE',
}

export enum SortType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type DomainSchema = {
  __typename?: 'DomainSchema';
  entityImages?: Maybe<Array<Maybe<DomainEntityImage>>>;
  version?: Maybe<Scalars['String']>;
};

export type DomainEntityImage = {
  __typename?: 'DomainEntityImage';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  entity?: Maybe<DomainEntity>;
  attributes?: Maybe<Array<Maybe<PropertyMeta>>>;
  description?: Maybe<Scalars['String']>;
};

export type DomainEntity = {
  __typename?: 'DomainEntity';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
};

/**
 * Model to description object attributes.
 *
 *     Model attributes:
 *         title - civil attribute name by user native language
 *         name - technical attribute name
 *         attr_type - attributes data type, must be mapped to marshmellow types,
 *                     example: Str, Int, RefLink('Model')
 *         unit - Attributes unit, example: km^2, m^3
 *         validation_rules - Rules for validation object attribute value
 */
export type PropertyMeta = {
  __typename?: 'PropertyMeta';
  title?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  entity?: Maybe<DomainEntity>;
  attrType?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  validationRules?: Maybe<ValidationRules>;
  description?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
};

/**
 * Validation Rules.
 *
 *     Todo:
 *     1. Develop valudation rule syntax
 *     2. Realize validate value by valudation rules
 */
export type ValidationRules = {
  __typename?: 'ValidationRules';
  rules?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** An enumeration. */
export enum ProjectTypeEnum {
  Geo = 'GEO',
}

export type Region = {
  __typename?: 'Region';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
};

export type Country = {
  __typename?: 'Country';
  vid?: Maybe<Scalars['ID']>;
  code?: Maybe<Scalars['String']>;
  isDeleted?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  editedAt?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  coordinateSystems?: Maybe<Array<Maybe<Scalars['String']>>>;
};

/** An enumeration. */
export enum ProjectStatusEnum {
  Blank = 'BLANK',
  Unpublished = 'UNPUBLISHED',
}

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
  /** Список доменных сущностей структуры проекта */
  domainEntities: Array<RbDomainEntity>;
  /** Список атрибутов структуры проекта */
  attributes: Array<Attribute>;
  /** Список рисков структуры проекта */
  risks: Array<Risk>;
  /** Список геологических объектов структуры проекта */
  domainObjects: Array<DomainObject>;
};

export type RbDomainEntity = {
  __typename?: 'RBDomainEntity';
  /** Кодовое обозначение доменной сущности геологического объекта */
  code: Scalars['String'];
  /** Имя доменной сущности геологического объекта */
  name: Scalars['String'];
  /** Иконка доменной сущности геологического объекта */
  icon: RbDomainEntityIcons;
  visible: Visible;
};

/** Список иконок доменной сущности геологического объекта. */
export enum RbDomainEntityIcons {
  LicensingRoundIcon = 'LICENSING_ROUND_ICON',
  FieldIcon = 'FIELD_ICON',
  FormationIcon = 'FORMATION_ICON',
  OilPoolIcon = 'OIL_POOL_ICON',
  WellIcon = 'WELL_ICON',
}

export type Visible = {
  __typename?: 'Visible';
  /** Отображения/Скрытие уровня иерархии в таблице */
  table: Scalars['Boolean'];
  /** Отображения/Скрытие уровня иерархии в дереве */
  tree: Scalars['Boolean'];
  /** Отображения/Скрытие уровня иерархии в расчетах */
  calc: Scalars['Boolean'];
};

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
  /** Категория геологического объекта */
  geoObjectCategory: GeoObjectCategories;
  /** Отображения/Скрытие объекта в таблице */
  visible: Scalars['Boolean'];
  /** Иерархия геологического объекта в структуре проекта */
  domainObjectPath: Array<DomainObjectPathLevel>;
  /** Список значений атрибутов геологического объекта */
  attributeValues: Array<AttributeValue>;
  /** Список рисков геологического объекта */
  risksValues: Array<RiskValue>;
  /** Значение GCoS геологического объекта */
  GCoS?: Maybe<Scalars['Float']>;
};

/** Список категорий геологического объекта. */
export enum GeoObjectCategories {
  Reserves = 'RESERVES',
  Resources = 'RESOURCES',
}

export type DomainObjectPathLevel = {
  __typename?: 'DomainObjectPathLevel';
  /** Кодовое обозначение уровня иерархии геологического объекта */
  code: Scalars['String'];
  /** Название уровня иерархии геологического объекта */
  value?: Maybe<Scalars['String']>;
};

export type AttributeValue = {
  __typename?: 'AttributeValue';
  /** Кодовое обозначение подсчётного параметра */
  code: Scalars['String'];
  distribution?: Maybe<Distribution>;
  /** Отображаемый в ячейке процентиль */
  visibleValue: VisibleValueResult;
};

export type AttributeValueVisibleValueArgs = {
  visibleRank?: Maybe<Scalars['Int']>;
};

/** Параметры распределения. */
export type Distribution = {
  __typename?: 'Distribution';
  /** Тип распределения */
  type: DistributionTypes;
  /** Способ задания распределения */
  definition: DistributionDefinitionTypes;
  /** Параметры распределения */
  parameters: Array<Maybe<DistributionParameter>>;
  /** Нижняя граница усечения */
  minBound?: Maybe<Scalars['Float']>;
  /** Верхняя граница усечения */
  maxBound?: Maybe<Scalars['Float']>;
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
  /** Константа */
  Constant = 'CONSTANT',
  /** Распределение Бернулли */
  Bernoulli = 'BERNOULLI',
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
  /** Через расположение, арифметическое среднее и один процентиль */
  LocationArmeanOnePercentile = 'LOCATION_ARMEAN_ONE_PERCENTILE',
  /** Через арифметическое среднее и два процентиля */
  ArmeanTwoPercentiles = 'ARMEAN_TWO_PERCENTILES',
  /** Через расположение, логарифмическое среднее и один процентиль */
  LocationLogmeanOnePercentile = 'LOCATION_LOGMEAN_ONE_PERCENTILE',
  /** Через логарифмическое среднее и два процентиля */
  LogmeanTwoPercentiles = 'LOGMEAN_TWO_PERCENTILES',
  /** Через наиболее вероятное и два процентиля */
  ModeTwoPercentiles = 'MODE_TWO_PERCENTILES',
  /** Через минимум, максимум и два процентиля */
  MinMaxTwoPercentiles = 'MIN_MAX_TWO_PERCENTILES',
  /** Константа */
  Constant = 'CONSTANT',
  /** Вероятность успеха */
  Probability = 'PROBABILITY',
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
  /** Константа */
  Constant = 'CONSTANT',
  /** Вероятность */
  Probability = 'PROBABILITY',
}

export type VisibleValueResult =
  | VisibleValue
  | CommonErrors
  | DistributionDefinitionErrors;

export type VisibleValue = {
  __typename?: 'VisibleValue';
  /** Ранг процентиля */
  rank: Scalars['Float'];
  /** Процентиль */
  value?: Maybe<Scalars['Float']>;
};

/** Список ошибок. */
export type CommonErrors = {
  __typename?: 'CommonErrors';
  errors: Array<CommonError>;
};

/** Общая ошибка. */
export type CommonError = RbErrorInterface & {
  __typename?: 'CommonError';
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: RbErrorCodes;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
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
  /** В строке таблицы структуры должна быть заполнена хотя бы одна ячейка */
  MustBeAtLeastOneCell = 'MUST_BE_AT_LEAST_ONE_CELL',
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
  /** Вероятность может иметь значение в пределах 0.0 < p <= 1.0 */
  InvalidProbabilityValue = 'INVALID_PROBABILITY_VALUE',
  /** Некорректное значение параметра для этого способа задания */
  IncorrectParameterValueForDefinition = 'INCORRECT_PARAMETER_VALUE_FOR_DEFINITION',
  /** Некорректный порядок значений процентилей */
  IncorrectOrderOfPercentileValues = 'INCORRECT_ORDER_OF_PERCENTILE_VALUES',
  /** Некорректный порядок рангов процентилей */
  IncorrectOrderOfPercentileRanks = 'INCORRECT_ORDER_OF_PERCENTILE_RANKS',
  /** Квантиль должен быть больше расположения */
  QuantileMustBeMoreThanLocation = 'QUANTILE_MUST_BE_MORE_THAN_LOCATION',
  /** В концепции отсутствует поле "вероятность" */
  ConceptionProbabilityIsNone = 'CONCEPTION_PROBABILITY_IS_NONE',
  /** Найдены концепции с не уникальными наименованиями */
  DuplicatingConceptionsNames = 'DUPLICATING_CONCEPTIONS_NAMES',
  /** Сумма вероятностей всех концепций не равна 1 */
  InvalidConceptionsProbabilitiesSum = 'INVALID_CONCEPTIONS_PROBABILITIES_SUM',
  /** Распределение не может быть восстановлено */
  DistributionCannotBeRestored = 'DISTRIBUTION_CANNOT_BE_RESTORED',
  /** Параметр version не найден. */
  VersionParamNotFound = 'VERSION_PARAM_NOT_FOUND',
  /** Значения доверительного интервала отрицательны */
  ConfidenceIntervalIsNegative = 'CONFIDENCE_INTERVAL_IS_NEGATIVE',
  /** Значение случайной величины отрицательное. */
  RandomVariableValueIsNegative = 'RANDOM_VARIABLE_VALUE_IS_NEGATIVE',
  /** В проекте отсутствуют доменные сущности */
  EmptyDomainEntities = 'EMPTY_DOMAIN_ENTITIES',
  /** Дублируются имена колонок */
  DuplicatingColumns = 'DUPLICATING_COLUMNS',
  /** Для категории 'Запасы' риски не должны быть указаны */
  RisksNotApplicableToReserves = 'RISKS_NOT_APPLICABLE_TO_RESERVES',
}

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

export type RiskValue = {
  __typename?: 'RiskValue';
  /** Кодовое обозначение риска */
  code: Scalars['String'];
  /** Значение риска */
  value?: Maybe<Scalars['Float']>;
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
  /** Список доменных сущностей структуры проекта */
  domainEntities: Array<RbDomainEntityInput>;
  /** Список атрибутов структуры проекта */
  attributes: Array<AttributeInput>;
  /** Список рисков структуры проекта */
  risks: Array<RiskInput>;
  /** Список геологических объектов структуры проекта */
  domainObjects: Array<DomainObjectInput>;
};

export type RbDomainEntityInput = {
  /** Кодовое обозначение доменной сущности геологического объекта */
  code: Scalars['String'];
  /** Имя доменной сущности геологического объекта */
  name: Scalars['String'];
  /** Иконка доменной сущности геологического объекта */
  icon: RbDomainEntityIcons;
  visible: VisibleInput;
};

export type VisibleInput = {
  /** Отображения/Скрытие уровня иерархии в таблице */
  table: Scalars['Boolean'];
  /** Отображения/Скрытие уровня иерархии в дереве */
  tree: Scalars['Boolean'];
  /** Отображения/Скрытие уровня иерархии в расчетах */
  calc: Scalars['Boolean'];
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
  /** Категория геологического объекта */
  geoObjectCategory: GeoObjectCategories;
  /** Отображения/Скрытие объекта в таблице */
  visible: Scalars['Boolean'];
  /** Иерархия геологического объекта в структуре проекта */
  domainObjectPath: Array<DomainObjectPathLevelInput>;
  /** Список значений атрибутов геологического объекта */
  attributeValues: Array<AttributeValueInput>;
  /** Список рисков геологического объекта */
  risksValues: Array<RiskValueInput>;
};

export type DomainObjectPathLevelInput = {
  /** Кодовое обозначение уровня иерархии геологического объекта */
  code: Scalars['String'];
  /** Название уровня иерархии геологического объекта */
  value?: Maybe<Scalars['String']>;
};

export type AttributeValueInput = {
  /** Кодовое обозначение подсчётного параметра */
  code: Scalars['String'];
  distribution?: Maybe<DistributionInput>;
};

/** Параметры распределения. */
export type DistributionInput = {
  /** Тип распределения */
  type: DistributionTypes;
  /** Способ задания распределения */
  definition: DistributionDefinitionTypes;
  /** Параметры распределения */
  parameters: Array<Maybe<DistributionParameterInput>>;
  /** Нижняя граница усечения */
  minBound?: Maybe<Scalars['Float']>;
  /** Верхняя граница усечения */
  maxBound?: Maybe<Scalars['Float']>;
};

/** Параметр способа задания распределения. */
export type DistributionParameterInput = {
  /** Тип параметра распределения */
  type: DistributionParameterTypes;
  value: Scalars['Float'];
};

export type RiskValueInput = {
  /** Кодовое обозначение риска */
  code: Scalars['String'];
  /** Значение риска */
  value?: Maybe<Scalars['Float']>;
};

/** Пространство имен для работы с распределениями. */
export type DistributionQueries = {
  __typename?: 'DistributionQueries';
  /** Результат вычисления значения распределения */
  distributionChart?: Maybe<DistributionChartResult>;
  /** Результат поиска альтернативных способов задания распределения */
  alternativeDefinitions?: Maybe<AlternativeDefinitionResult>;
};

/** Пространство имен для работы с распределениями. */
export type DistributionQueriesDistributionChartArgs = {
  distribution: DistributionInput;
  visibleRank?: Maybe<Scalars['Int']>;
};

/** Пространство имен для работы с распределениями. */
export type DistributionQueriesAlternativeDefinitionsArgs = {
  distribution: DistributionInput;
};

export type DistributionChartResult =
  | DistributionChart
  | DiscreteDistributionChart
  | CommonErrors
  | DistributionDefinitionErrors;

/** Результаты вычисления заданного непрерывного распределения. */
export type DistributionChart = {
  __typename?: 'DistributionChart';
  /** График функции плотности распределения */
  pdf: Array<Point>;
  /** Функция надежности (1 - cdf) */
  sf: Array<Point>;
  /** Точки процентилей */
  percentiles: Array<Percentile>;
  /** Отображаемый в ячейке процентиль */
  visiblePercentile: Percentile;
};

/** Точка на графике. */
export type Point = {
  __typename?: 'Point';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

/** Процентиль распределения. */
export type Percentile = {
  __typename?: 'Percentile';
  point: Point;
  /** Процентильный ранг (1-99) */
  rank: Scalars['Int'];
};

/** Результаты вычисления заданного дискретного распределения. */
export type DiscreteDistributionChart = {
  __typename?: 'DiscreteDistributionChart';
  /** График функции вероятности распределения */
  pmf: Array<Point>;
  /** Отображаемый в ячейке процентиль */
  visiblePercentile: Percentile;
};

export type AlternativeDefinitionResult =
  | AlternativeDefinitions
  | DistributionDefinitionErrors
  | CommonErrors;

/** Результаты определения альтернативных способов задания распределения. */
export type AlternativeDefinitions = {
  __typename?: 'AlternativeDefinitions';
  /** Альтернативные способы задания с расчитанными параметрами */
  distributions: Array<Distribution>;
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
  objectGroup?: Maybe<Scalars['UUID']>;
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
  isDeleted?: Maybe<Scalars['Boolean']>;
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
  isDeleted?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<ActivityLibraryCategory>;
};

/** Эффект мероприятия. */
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
  code: ErrorCodesEnum;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['DictType']>;
};

/** Интерфейс ошибок, отображаемых пользователю. */
export type ErrorInterface = {
  /** Код ошибки, соответствующий человекочитаемому сообщению об ошибке */
  code: ErrorCodesEnum;
  /** Сообщение об ошибке. Отображается в случае отсутствия соответствующего коду человекочитаемого сообщения на клиенте */
  message: Scalars['String'];
  details?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['DictType']>;
};

/** Error codes list. */
export enum ErrorCodesEnum {
  /** Проект не найден */
  ProjectNotFound = 'PROJECT_NOT_FOUND',
  /** Ошибка при обновлении проекта */
  ProjectUpdateError = 'PROJECT_UPDATE_ERROR',
  /** Объект справочника не найден */
  ReferenceItemNotFound = 'REFERENCE_ITEM_NOT_FOUND',
  /** Ошибка */
  Error = 'ERROR',
  /** Некорректная версия проекта */
  IncorrectProjectVersion = 'INCORRECT_PROJECT_VERSION',
  /** Расхождение версий проекта */
  ProjectVersionDiffError = 'PROJECT_VERSION_DIFF_ERROR',
  /** Проект с таким именем уже существует */
  ProjectNameAlreadyExists = 'PROJECT_NAME_ALREADY_EXISTS',
  /** Пользователь не обладает правами для совершения операции */
  NoRights = 'NO_RIGHTS',
  /** Объект не найден */
  ObjectNotFound = 'OBJECT_NOT_FOUND',
  /** Отсутствует роль */
  EmptyAttendeeRole = 'EMPTY_ATTENDEE_ROLE',
  /** Удаляемый участник не найден в проекте  */
  NoAttendeeToRemove = 'NO_ATTENDEE_TO_REMOVE',
  /** Некорректный формат UUID */
  IncorrectUuid = 'INCORRECT_UUID',
  /** Участник проекта не найден */
  ProjectAttendeeNotFound = 'PROJECT_ATTENDEE_NOT_FOUND',
  /** Участник проекта уже обладет данной ролью */
  ProjectAttendeeAlreadyHasRole = 'PROJECT_ATTENDEE_ALREADY_HAS_ROLE',
  /** Рольу участника проекта не найдена */
  ProjectAttendeeUserRoleNotFound = 'PROJECT_ATTENDEE_USER_ROLE_NOT_FOUND',
  /** Невозможно добавить участника с дублирующимися ролями. */
  ProjectAttendeeUserWithDuplicateRoles = 'PROJECT_ATTENDEE_USER_WITH_DUPLICATE_ROLES',
  /** Невозможно сохранить проект - не найден менеджер проекта */
  ProjectManagerNotFound = 'PROJECT_MANAGER_NOT_FOUND',
  /** Проект нельзя возвращать в статус заготовки. */
  CannotBringBlankBack = 'CANNOT_BRING_BLANK_BACK',
  /** Неверный номер страницы */
  InvalidPageNumber = 'INVALID_PAGE_NUMBER',
  /** Ошибка валидации */
  Validation = 'VALIDATION',
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
  domainObject?: Maybe<DomainObjectInterface>;
  objectGroup?: Maybe<DomainObjectGroupType>;
  objectGroupList?: Maybe<Array<Maybe<DomainObjectGroupType>>>;
};

export type DomainObjectQueryDomainObjectArgs = {
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

export type DomainObjectQueryObjectGroupArgs = {
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

export type DomainObjectGroupType = {
  __typename?: 'DomainObjectGroupType';
  vid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  objects?: Maybe<Array<Maybe<DomainObjectInterface>>>;
  formula?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Актуальная версия текущего проекта */
  version?: Maybe<Scalars['Int']>;
  project?: Maybe<ProjectMutationOrError>;
};

export type MutationProjectArgs = {
  version: Scalars['Int'];
};

export type ProjectMutationOrError =
  | ProjectMutation
  | Error
  | UpdateProjectInnerDiff;

export type ProjectMutation = {
  __typename?: 'ProjectMutation';
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
  removeOpexAutoexport?: Maybe<Error>;
  createOpexAutoexportExpense?: Maybe<CreateOpexAutoexportExpense>;
  changeOpexAutoexportExpense?: Maybe<ChangeOpexAutoexportExpense>;
  deleteOpexAutoexportExpense?: Maybe<DeleteOpexAutoexportExpense>;
  setOpexAutoexportExpenseYearValue?: Maybe<SetOpexAutoexportExpenseYearValue>;
  setOpexMkos?: Maybe<SetOpexMkos>;
  setOpexSdf?: Maybe<SetOpexSdf>;
  changeOpexMkos?: Maybe<ChangeOpexMkos>;
  removeOpexMkos?: Maybe<Error>;
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

export type ProjectMutationCreateScenarioArgs = {
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ProjectMutationUpdateScenarioArgs = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productTypes?: Maybe<Array<Maybe<ProductTypeInput>>>;
  scenarioId: Scalars['ID'];
};

export type ProjectMutationDeleteScenarioArgs = {
  scenarioId: Scalars['ID'];
};

export type ProjectMutationCreateNetbackArgs = {
  netbackName: Scalars['String'];
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationUpdateNetbackArgs = {
  netbackName?: Maybe<Scalars['String']>;
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationDeleteNetbackArgs = {
  netbackName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type ProjectMutationCreateProductTypeArgs = {
  fareAllow?: Maybe<Scalars['Boolean']>;
  productTypeName: Scalars['String'];
  qualityAward?: Maybe<Scalars['Float']>;
  qualityDiscount?: Maybe<Scalars['Float']>;
  scenarioId: Scalars['ID'];
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationUpdateProductTypeArgs = {
  fareAllow?: Maybe<Scalars['Boolean']>;
  productTypeId: Scalars['ID'];
  productTypeName?: Maybe<Scalars['String']>;
  qualityAward?: Maybe<Scalars['Float']>;
  qualityDiscount?: Maybe<Scalars['Float']>;
  scenarioId: Scalars['ID'];
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationDeleteProductTypeArgs = {
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type ProjectMutationCreateProductArgs = {
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
};

export type ProjectMutationUpdateProductArgs = {
  prices?: Maybe<Array<Maybe<AverageAnnualPriceTypeInput>>>;
  productName?: Maybe<Scalars['String']>;
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
  units?: Maybe<Scalars['String']>;
};

export type ProjectMutationDeleteProductArgs = {
  productName: Scalars['String'];
  productTypeId: Scalars['ID'];
  scenarioId: Scalars['ID'];
};

export type ProjectMutationCreateMacroparameterSetArgs = {
  allProjects?: Maybe<Scalars['Boolean']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<MacroparameterSetCategory>;
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type ProjectMutationChangeMacroparameterSetArgs = {
  allProjects?: Maybe<Scalars['Boolean']>;
  caption?: Maybe<Scalars['String']>;
  category?: Maybe<MacroparameterSetCategory>;
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type ProjectMutationDeleteMacroparameterSetArgs = {
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type ProjectMutationCreateMacroparameterGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type ProjectMutationChangeMacroparameterGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type ProjectMutationDeleteMacroparameterGroupArgs = {
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type ProjectMutationCreateMacroparameterArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationChangeMacroparameterArgs = {
  caption?: Maybe<Scalars['String']>;
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationClearMacroparameterValueArgs = {
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
};

export type ProjectMutationSetMacroparameterYearValueArgs = {
  macroparameterGroupId: Scalars['ID'];
  macroparameterId: Scalars['ID'];
  macroparameterSetId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type ProjectMutationDeleteMacroparameterArgs = {
  macroparameterGroupId?: Maybe<Scalars['ID']>;
  macroparameterId?: Maybe<Scalars['ID']>;
  macroparameterSetId?: Maybe<Scalars['ID']>;
};

export type ProjectMutationSetOpexAutoexportArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationChangeOpexAutoexportArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationCreateOpexAutoexportExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationChangeOpexAutoexportExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationDeleteOpexAutoexportExpenseArgs = {
  expenseId: Scalars['ID'];
};

export type ProjectMutationSetOpexAutoexportExpenseYearValueArgs = {
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type ProjectMutationSetOpexMkosArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationSetOpexSdfArgs = {
  sdf?: Maybe<Scalars['Boolean']>;
};

export type ProjectMutationChangeOpexMkosArgs = {
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationCreateOpexMkosExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationChangeOpexMkosExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationDeleteOpexMkosExpenseArgs = {
  expenseId: Scalars['ID'];
};

export type ProjectMutationSetOpexMkosExpenseYearValueArgs = {
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type ProjectMutationCreateOpexCaseArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationChangeOpexCaseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  yearEnd?: Maybe<Scalars['Int']>;
  yearStart?: Maybe<Scalars['Int']>;
};

export type ProjectMutationDeleteOpexCaseArgs = {
  caseId: Scalars['ID'];
};

export type ProjectMutationCreateOpexCaseExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationChangeOpexCaseExpenseArgs = {
  caption?: Maybe<Scalars['String']>;
  caseId: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  expenseId: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationDeleteOpexCaseExpenseArgs = {
  caseId: Scalars['ID'];
  expenseId: Scalars['ID'];
};

export type ProjectMutationSetOpexCaseExpenseYearValueArgs = {
  caseId: Scalars['ID'];
  expenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type ProjectMutationCreateCapexExpenseGroupArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ProjectMutationChangeCapexExpenseGroupArgs = {
  capexExpenseGroupId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  yearStart?: Maybe<Scalars['Int']>;
  years?: Maybe<Scalars['Int']>;
};

export type ProjectMutationDeleteCapexExpenseGroupArgs = {
  capexExpenseGroupId?: Maybe<Scalars['ID']>;
};

export type ProjectMutationSetCapexExpenseYearValueArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
  value: Scalars['Float'];
  year: Scalars['Int'];
};

export type ProjectMutationCreateCapexExpenseArgs = {
  capexExpenseGroupId?: Maybe<Scalars['ID']>;
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationChangeCapexExpenseArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationDeleteCapexExpenseArgs = {
  capexExpenseGroupId: Scalars['ID'];
  capexExpenseId: Scalars['ID'];
};

export type ProjectMutationCreateCapexGlobalValueArgs = {
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationUpdateCapexGlobalValueArgs = {
  capexGlobalValueId: Scalars['ID'];
  caption?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
};

export type ProjectMutationDeleteCapexGlobalValueArgs = {
  capexGlobalValueId: Scalars['ID'];
};

export type ProjectMutationCreateCapexArgs = {
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
  /** Индекс строки таблицы, повлекшей ошибку */
  row?: Maybe<Scalars['Int']>;
  /** Идентификатор сущности в колонке. */
  columnKey?: Maybe<Scalars['String']>;
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
  | DistributionDefinitionErrors
  | DetailError;

export type CalculationResult = {
  __typename?: 'CalculationResult';
  /** Архив с результатом вычислений.             Доступен по url /files/calculation_result/<resultId> */
  resultId?: Maybe<Scalars['ID']>;
};

export type TableErrors = {
  __typename?: 'TableErrors';
  errors: Array<TableError>;
};

/** Результат сохранения проекта. */
export type SavedOrError = TableErrors | DistributionDefinitionErrors | Error;

export type LogicMutations = {
  __typename?: 'LogicMutations';
  scenarioStep?: Maybe<ScenarioStepMutations>;
  canvas?: Maybe<CanvasMutations>;
};

/** Мутации для шагов сценария. */
export type ScenarioStepMutations = {
  __typename?: 'ScenarioStepMutations';
  /** Создание шага сценария. */
  create?: Maybe<CreateScenarioStep>;
  /** Обновление шага сценария. */
  update?: Maybe<UpdateScenarioStep>;
  /** Удаление шага сценария. */
  delete?: Maybe<DeleteScenarioStep>;
  items?: Maybe<ScenarioStepItemMutations>;
};

/** Мутации для шагов сценария. */
export type ScenarioStepMutationsCreateArgs = {
  activity?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  objectGroup?: Maybe<Scalars['UUID']>;
  objects?: Maybe<Array<Maybe<Scalars['UUID']>>>;
};

/** Мутации для шагов сценария. */
export type ScenarioStepMutationsUpdateArgs = {
  activity?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  objectGroup?: Maybe<Scalars['UUID']>;
  objects?: Maybe<Array<Maybe<Scalars['UUID']>>>;
  vid: Scalars['UUID'];
};

/** Мутации для шагов сценария. */
export type ScenarioStepMutationsDeleteArgs = {
  vid: Scalars['UUID'];
};

/** Создание шага сценария. */
export type CreateScenarioStep = {
  __typename?: 'CreateScenarioStep';
  result?: Maybe<ScenarioStep>;
};

/** Обновление шага сценария. */
export type UpdateScenarioStep = {
  __typename?: 'UpdateScenarioStep';
  result?: Maybe<ScenarioStep>;
};

/** Удаление шага сценария. */
export type DeleteScenarioStep = {
  __typename?: 'DeleteScenarioStep';
  ok?: Maybe<Scalars['Boolean']>;
};

/** Мутации для шагов сценария. */
export type ScenarioStepItemMutations = {
  __typename?: 'ScenarioStepItemMutations';
  /** Создание элемента шага сценария. */
  create?: Maybe<CreateScenarioStepItem>;
  /** Изменение элемента шага сценария. */
  update?: Maybe<UpdateScenarioStepItem>;
  /** Удаление элемента шага сценария. */
  delete?: Maybe<DeleteScenarioStepItem>;
  effects?: Maybe<ActivityEffectMutations>;
};

/** Мутации для шагов сценария. */
export type ScenarioStepItemMutationsCreateArgs = {
  activityVid: Scalars['UUID'];
  objectGroupVid?: Maybe<Scalars['UUID']>;
  objectVid?: Maybe<Scalars['UUID']>;
  risk?: Maybe<Scalars['String']>;
  stepVid: Scalars['UUID'];
};

/** Мутации для шагов сценария. */
export type ScenarioStepItemMutationsUpdateArgs = {
  activityVid?: Maybe<Scalars['UUID']>;
  objectGroupVid?: Maybe<Scalars['UUID']>;
  objectVid?: Maybe<Scalars['UUID']>;
  risk?: Maybe<Scalars['String']>;
  stepVid: Scalars['UUID'];
  vid: Scalars['UUID'];
};

/** Мутации для шагов сценария. */
export type ScenarioStepItemMutationsDeleteArgs = {
  stepVid: Scalars['UUID'];
  vid: Scalars['UUID'];
};

/** Создание элемента шага сценария. */
export type CreateScenarioStepItem = {
  __typename?: 'CreateScenarioStepItem';
  result?: Maybe<ScenarioStepItem>;
};

/** Изменение элемента шага сценария. */
export type UpdateScenarioStepItem = {
  __typename?: 'UpdateScenarioStepItem';
  result?: Maybe<ScenarioStepItem>;
};

/** Удаление элемента шага сценария. */
export type DeleteScenarioStepItem = {
  __typename?: 'DeleteScenarioStepItem';
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
  scenario?: Maybe<ScenarioOrDiffOrError>;
};

export type ScenarioOrDiffOrError = ScenarioType | Error;

export type ScenarioUpdateMutation = {
  __typename?: 'ScenarioUpdateMutation';
  scenario?: Maybe<ScenarioOrDiffOrError>;
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
  netback?: Maybe<NetbackPriceOrDiffOrError>;
};

export type NetbackPriceOrDiffOrError = NetbackPriceType | Error;

export type AverageAnnualPriceTypeInput = {
  /** Год */
  year?: Maybe<Scalars['Int']>;
  /** Цена */
  price?: Maybe<Scalars['Float']>;
};

export type UpdateNetback = {
  __typename?: 'UpdateNetback';
  netback?: Maybe<NetbackPriceOrDiffOrError>;
};

export type DeleteNetback = {
  __typename?: 'DeleteNetback';
  result?: Maybe<UuidOrError>;
};

export type CreateProductType = {
  __typename?: 'CreateProductType';
  productType?: Maybe<ProductTypeOrDiffOrError>;
};

export type ProductTypeOrDiffOrError = ProductType | Error;

export type UpdateProductType = {
  __typename?: 'UpdateProductType';
  productType?: Maybe<ProductTypeOrDiffOrError>;
};

export type DeleteProductType = {
  __typename?: 'DeleteProductType';
  result?: Maybe<UuidOrError>;
};

export type CreateProduct = {
  __typename?: 'CreateProduct';
  product?: Maybe<ProductOrDiffOrError>;
};

export type ProductOrDiffOrError = Product | Error;

export type UpdateProduct = {
  __typename?: 'UpdateProduct';
  product?: Maybe<ProductOrDiffOrError>;
};

export type DeleteProduct = {
  __typename?: 'DeleteProduct';
  result?: Maybe<UuidOrError>;
};

export type CreateMacroparameterSet = {
  __typename?: 'CreateMacroparameterSet';
  macroparameterSet?: Maybe<MacroparameterSetOrDiffOrError>;
};

export type MacroparameterSetOrDiffOrError = MacroparameterSet | Error;

export type ChangeMacroparameterSet = {
  __typename?: 'ChangeMacroparameterSet';
  macroparameterSet?: Maybe<MacroparameterSetOrDiffOrError>;
};

export type DeleteMacroparameterSet = {
  __typename?: 'DeleteMacroparameterSet';
  result?: Maybe<UuidOrError>;
};

export type CreateMacroparameterGroup = {
  __typename?: 'CreateMacroparameterGroup';
  macroparameterGroup?: Maybe<MacroparameterGroupOrDiffOrError>;
};

export type MacroparameterGroupOrDiffOrError = MacroparameterGroup | Error;

export type ChangeMacroparameterGroup = {
  __typename?: 'ChangeMacroparameterGroup';
  macroparameterGroup?: Maybe<MacroparameterGroupOrDiffOrError>;
};

export type DeleteMacroparameterGroup = {
  __typename?: 'DeleteMacroparameterGroup';
  result?: Maybe<UuidOrError>;
};

export type CreateMacroparameter = {
  __typename?: 'CreateMacroparameter';
  macroparameter?: Maybe<MacroparameterOrDiffOrError>;
};

export type MacroparameterOrDiffOrError = Macroparameter | Error;

export type ChangeMacroparameter = {
  __typename?: 'ChangeMacroparameter';
  macroparameter?: Maybe<MacroparameterOrDiffOrError>;
};

export type ClearMacroparameterValue = {
  __typename?: 'ClearMacroparameterValue';
  macroparameter?: Maybe<MacroparameterOrDiffOrError>;
};

export type SetMacroparameterYearValue = {
  __typename?: 'SetMacroparameterYearValue';
  macroparameter?: Maybe<MacroparameterOrDiffOrError>;
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
  capexExpenseGroup?: Maybe<CapexExpenseGroupOrDiffOrError>;
};

export type CapexExpenseGroupOrDiffOrError = CapexExpenseGroup | Error;

export type ChangeCapexExpenseGroup = {
  __typename?: 'ChangeCapexExpenseGroup';
  capexExpenseGroup?: Maybe<CapexExpenseGroupOrDiffOrError>;
};

export type DeleteCapexExpenseGroup = {
  __typename?: 'DeleteCapexExpenseGroup';
  result?: Maybe<UuidOrError>;
};

export type SetCapexExpenseYearValue = {
  __typename?: 'SetCapexExpenseYearValue';
  capexExpense?: Maybe<CapexExpenseOrDiffOrError>;
  totalValueByYear?: Maybe<Array<Maybe<CapexYearValueType>>>;
};

export type CapexExpenseOrDiffOrError = CapexExpense | Error;

export type CreateCapexExpense = {
  __typename?: 'CreateCapexExpense';
  capexExpense?: Maybe<CapexExpenseOrDiffOrError>;
};

export type ChangeCapexExpense = {
  __typename?: 'ChangeCapexExpense';
  totalValueByYear?: Maybe<Array<Maybe<CapexYearValueType>>>;
  capexExpense?: Maybe<CapexExpenseOrDiffOrError>;
};

export type DeleteCapexExpense = {
  __typename?: 'DeleteCapexExpense';
  result?: Maybe<UuidOrError>;
};

export type CreateCapexGlobalValue = {
  __typename?: 'CreateCapexGlobalValue';
  capexGlobalValue?: Maybe<CapexGlobalValueOrDiffOrError>;
};

export type CapexGlobalValueOrDiffOrError = CapexGlobalValue | Error;

export type UpdateCapexGlobalValue = {
  __typename?: 'UpdateCapexGlobalValue';
  capexGlobalValue?: Maybe<CapexGlobalValueOrDiffOrError>;
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
  removeOpexAutoexport?: Maybe<Error>;
  createOpexAutoexportExpense?: Maybe<CreateOpexAutoexportExpense>;
  changeOpexAutoexportExpense?: Maybe<ChangeOpexAutoexportExpense>;
  deleteOpexAutoexportExpense?: Maybe<DeleteOpexAutoexportExpense>;
  setOpexAutoexportExpenseYearValue?: Maybe<SetOpexAutoexportExpenseYearValue>;
  setOpexMkos?: Maybe<SetOpexMkos>;
  setOpexSdf?: Maybe<SetOpexSdf>;
  changeOpexMkos?: Maybe<ChangeOpexMkos>;
  removeOpexMkos?: Maybe<Error>;
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
  capex?: Maybe<CapexOrDiffOrError>;
};

export type CapexOrDiffOrError = Capex | Error;

export type DomainMutations = {
  __typename?: 'DomainMutations';
  object?: Maybe<DomainObjectMutations>;
  objectGroup?: Maybe<DomainObjectGroupMutations>;
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

/** Contains remote and local versions of  project if versions are not equal. */
export type UpdateProjectInnerDiff = {
  __typename?: 'UpdateProjectInnerDiff';
  remoteProject?: Maybe<ProjectInner>;
  localProject?: Maybe<ProjectInner>;
  message?: Maybe<Scalars['String']>;
};

// The file generated on: 04.03.2021
