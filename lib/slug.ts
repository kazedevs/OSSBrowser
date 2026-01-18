

export function slugify(owner: string, repo: string){
    return `${owner}-${repo}`
    .toLowerCase().replace(/[^a-z0-9]/g, "-")
    .replace(/^\-+|\-+$/g, "");
}