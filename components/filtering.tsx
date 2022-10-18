import { Dispatch } from "react"
import { Tool } from "./pres"

const DEFAULT_FILTER = "all"

class Filter<T> {
    static count = 0 // for id generation
    id: string
    default_value: T
    comp: (v: Tool, f: T) => boolean


    constructor(default_val: T, comp: (v: Tool, f: T) => boolean) {
        this.default_value = default_val;
        this.comp = comp
        this.id = "filter-" + Filter.count++
    }

    filter(data: Tool[]) {

        let value = this.getValue()

        if (value != this.default_value) {
            return data.filter((v) => this.comp(v, value))
        }
        return data
    }

    getValue(): T {
        return (document.getElementById(this.id) as HTMLSelectElement).value as T
    }

    reset() {
        (document.getElementById(this.id) as HTMLSelectElement).selectedIndex = 0
    }
}

/* utils functions */

function filter_data(filters: Array<Filter<any>>, data: Tool[], setFilteredData: Dispatch<Tool[]>) {
    let result = data

    filters.forEach(f =>
        result = f.filter(result)
    )

    // apply search after filters to improve performance
    result = search(result)

    setFilteredData(result)
}

function reset(filters: Array<Filter<any>>, data: Tool[], setFilteredData: Dispatch<Tool[]>) {

    filters.forEach(f => f.reset()); // semicolon needed because followed by "()"
    (document.getElementById("search-input") as HTMLInputElement).value = ""


    setFilteredData(data)
}

function search(data: Tool[]) {

    let input = (document.getElementById("search-input") as HTMLInputElement).value

    if (input != "") {
        let results: Tool[] = []
        data.forEach((tool: Tool) => {
            // search in name and description
            if (tool.name.toLowerCase().search(input) > -1 || tool.description.toLowerCase().search(input) > -1) {
                results.push(tool)
            }
            // search in tags
            else if (tool.tags.indexOf(input) > -1) {
                results.push(tool)
            }
        })

        return results
    }

    return data
}

/* JSX components */

function FilterSelect(values: string[], filter: Filter<any>, filters: Filter<any>[], data: Tool[], setFilteredData: Dispatch<Tool[]>) {
    return (
        <select className="form-select appearance-none
                                block
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white bg-clip-padding bg-no-repeat
                                border border-solid border-gray-300
                                rounded
                                transition
                                ease-in-out
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id={filter.id}
            onChange={(v) => { filter_data(filters, data, setFilteredData) }}>
            <option selected value={DEFAULT_FILTER}>All</option>
            {values.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
    )
}

function SearchInput(data: Tool[], filters: Array<Filter<any>>, setFilteredData: Dispatch<Tool[]>) {
    return (
        <div className="flex flex-row" >
            <input type="text"
                className="form-control w-full min-w-min px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Search tools"
                id="search-input"
            />
            <button type="button"
                className="md:mr-8 inline-block p-1.5 bg-stone-900 text-white font-medium text-xs leading-tight uppercase rounded-r shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={_ => filter_data(filters, data, setFilteredData)}>
                <i className="fa-solid fa-search"></i>
            </button>
        </div>
    )
}

function Filters(data: Tool[], apply: Dispatch<Tool[]>) {

    let categories: string[] = []
    let platforms: string[] = []
    let types: string[] = []

    const filter_category = new Filter<string>(DEFAULT_FILTER, (v, f) => v.category == f)
    const filter_platforms = new Filter<string>(DEFAULT_FILTER, (v, f) => v.platform == f)
    const filter_types = new Filter<string>(DEFAULT_FILTER, (v, f) => v.type == f)
    const filter_array = [filter_category, filter_platforms, filter_types]

    // initiate only once
    if (categories.length == 0) {
        let categories_temp = new Set<string>()
        let platforms_temp = new Set<string>()
        let types_temp = new Set<string>()

        data.map((t: Tool) => {
            categories_temp.add(t.category)
            platforms_temp.add(t.platform)
            types_temp.add(t.type)
        })

        categories = Array.from(categories_temp).sort()
        platforms = Array.from(platforms_temp).sort()
        types = Array.from(types_temp).sort()
    }


    return (
        <div>
            <div className="flex justify-end ">
                <div className="flex flex-col md:flex-row gap-4 justify-center w-full border md:border-0 md:w-min py-4 px-8">
                    <h3 className="md:hidden"><b>Filters</b></h3>
                    <div>
                        <h3>Category: </h3>
                        {FilterSelect(categories, filter_category, filter_array, data, apply)}
                    </div>
                    <div>
                        <h3>Platform: </h3>
                        {FilterSelect(platforms, filter_platforms, filter_array, data, apply)}
                    </div>
                    <div>
                        <h3>Type: </h3>
                        {FilterSelect(types, filter_types, filter_array, data, apply)}
                    </div>
                    <div>
                        <h3>Search</h3>
                        {SearchInput(data, filter_array, apply)}
                    </div>
                    <div className="flex">
                        <button type="button" onClick={_ => reset(filter_array, data, apply)}
                            className="ml-auto mt-auto flex px-1.5 py-3 h-min font-medium text-xs leading-tight rounded active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            <h3 className="md:hidden mr-2">Reset </h3>
                            <i title="Reset filters" className="fa-solid fa-arrow-rotate-left"></i>
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default Filters