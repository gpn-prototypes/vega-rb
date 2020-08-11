export interface TemplateCategory {
    name: string
}
export interface TemplateCell {
    cells: string[]
}

export interface TemplateStructure {
    geoObjectCategories: TemplateCategory[]
    rows?: TemplateCell[]
}
