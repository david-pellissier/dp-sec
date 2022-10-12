import Image from "next/image"

enum keys {
    name, description, homepage, documentation, tags, category, platform, type, image // needs to match the order of Google Sheets columns
}

const CATEGORIES = {
    Forensics : ["border-b-cyan-400", "bg-cyan-400", "forensic.png", "forensic-bg.png"],
    Android : ["border-b-green-400", "bg-green-400", "android.png", "android-bg.png"],
    Cryptography : ["border-b-yellow-200", "bg-yellow-200", "cryptography.png", "cryptography-bg.png"],
    Misc : ["border-b-gray-400", "bg-gray-400", "misc.png", "misc-bg.png"],
    Network : ["border-b-violet-500", "bg-violet-500", "network.png", "network-bg.png"],
    OSINT : ["border-b-orange-400", "bg-orange-400", "osint.png", "osint-bg.png"],
    Pentest : ["border-b-lime-400", "bg-lime-400", "pentest.png", "pentest-bg.png"],
    Pwn : ["border-b-rose-50", "bg-rose-500", "pwn.png", "pwn-bg.png"], // https://www.flaticon.com/free-icon/software-development_2560114?term=software&page=1&position=5&page=1&position=5&related_id=2560114&origin=style#
    Rev : ["border-b-red-500", "bg-red-500", "rev.png", "rev-bg.png"],
    Stegano : ["border-b-blue-500", "bg-blue-500", "stegano.png", "stegano-bg.png"],
    Web : ["border-b-fuchsia-400", "bg-fuchsia-400", "web.png", "web-bg.png"],
    Cloud : ["border-b-purple-400", "bg-purple-400", "cloud.png", "cloud-bg.png"],
    Unknown: ["border-b-white", "bg-white", "unknown.png", "unknown-bg.png"]
}

export class Tool {
    name: String
    description: String
    homepage: String
    documentation: Array<String>
    tags: Array<String>
    category: String
    platform: String
    type: String
    image: String | undefined
    icon: String
    color: String
    border_color: String



    constructor(arr: Array<any>) {
        this.name = arr[keys.name];
        this.description = arr[keys.description]
        this.homepage = arr[keys.homepage]
        this.documentation = arr[keys.documentation].split(',')
        this.tags = arr[keys.tags].split(',')
        this.platform = arr[keys.platform]
        this.type = arr[keys.type]
        this.category = arr[keys.category]
        this.image = arr[keys.image]

        // Next attributes may be undefined if the category is not defined
        let category_attributes = CATEGORIES[arr[keys.category]]
        if(category_attributes == undefined){
            category_attributes = CATEGORIES["Unknown"]
        }
        this.border_color = category_attributes[0]
        this.color = category_attributes[1]
        this.icon = category_attributes[2]
        
        
        // Set a default image if there is no image in the doc
        if(this.image == ""){
            this.image = category_attributes[3]
        }
    }
}

export default function PresentationCard({tool}){

    return (
        <div class="flex flex-col w-[437px] h-[382px] rounded-2xl bg-white shadow-2xl">
            <div class={"min-h-[191px] bg-stone-900 rounded-t-2xl border-b-4 " + tool.border_color}></div>
            <div class="flex flex-row py-4">
                <div class="flex flex-col w-full px-5">
                    <h3 class="text-2xl">{tool.name}</h3>
                    <div class="max-h-24 truncate whitespace-normal">{(tool.description.length > 164) ? tool.description.substr(0,164) + "..." : tool.description}</div>
                    <div class="mt-auto max-w-full">
                        {tool.tags.map(e => <span key={e} class="rounded-md bg-neutral-200 px-0.5 py-0.5 mr-2">{e}</span>)}
                    </div>
                </div>
                <div class="flex flex-col pr-4 h-full items-center">
                    <div class={"relative -top-10 w-12 h-12 rounded-full " + tool.color}>
                        <Image class="p-2" title={tool.category} alt={tool.category} src={"/images/category/" + tool.icon} />
                    </div>
                    <div class="relative -top-4 h-full">
                        <Image img class="w-8 h-8" alt={tool.platform} title={tool.platform} src="images/platform/python.png"/>
                        <Image img class="w-8 h-8 mt-8" alt={tool.type} title={tool.type} src="images/type/tool.png"/>
                    </div>
                </div>
            </div>
        </div>
    )
}