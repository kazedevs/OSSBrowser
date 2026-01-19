
const GITHUB_API_URL = "https://api.github.com";


type GitHubProject = {
    owner: string,
    repo: string,
    slug: string,
    owner_avatar_url: string,
    repoUrl: string,
    description: string,
    primaryLanguage: string,
    languages: Record<string, number>,
    tags: string[],
    contributors: Array<{login: string, avatar_url: string, html_url: string}>,
    stars: number,
    forks: number,
    status: string,
    openIssues: number,
    lastCommitAt: string,
    readmeHtml: string,
    website: string | null,
}

function getHeaders(){
    return {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
    }
}

function parseRepoUrl(repoUrl: string) {
    const url = new URL(repoUrl);
    
    if(url.hostname !== "github.com") {
        throw new Error("Invalid Github Url");
    }
    const [owner, repo] = url.pathname.replace(/^\//, "").split("/");
    
    if(!owner || !repo) {
        throw new Error("Invalid Github Url");
    }
    return {owner, repo};
}

async function fetchRepo(owner: string, repo: string){
    const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}`, {
        headers: getHeaders(),
    });
    if(!res.ok) {
        throw new Error(`Failed to fetch repo data: ${res.statusText}`);
    }
    return res.json();
}

async function fetchLanguages(owner: string, repo: string) {
    const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/languages`, {
        headers: getHeaders(),
    });
    if(!res.ok) return {};
    return res.json();
}

async function fetchContributors(owner: string, repo: string) {
    const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/contributors?per_page=10`, {
        headers: getHeaders(),
    });
    if(!res.ok) return [];
    const data = await res.json();
    return data.map((c: any) => ({
        login: c.login,
        avatar_url: c.avatar_url,
        html_url: c.html_url
    }));
}

async function fetchReadme(owner: string, repo: string) {
    const res = await fetch(`${GITHUB_API_URL}/repos/${owner}/${repo}/readme`, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.html",
        }
    });
    if(!res.ok) {
        throw new Error(`Failed to fetch readme data: ${res.statusText}`);
    }
    return res.text();
}


export async function fetchGitHubProject(
    repoUrl: string
): Promise<GitHubProject> {
    const {owner, repo} = parseRepoUrl(repoUrl);

    const [repoData, languages, contributors, readmeHtml] = await Promise.all([
        fetchRepo(owner, repo),
        fetchLanguages(owner, repo),
        fetchContributors(owner, repo),
        fetchReadme(owner, repo),
    ]);

    return {
        owner,
        repo,
        slug: `${owner}/${repo}`,
        owner_avatar_url: repoData.owner.avatar_url,    
        repoUrl,
        description: repoData.description || "",
        primaryLanguage: repoData.language || "",
        languages: languages,
        tags: repoData.topics || [],
        contributors: contributors,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        status: "pending_review",
        openIssues: repoData.open_issues_count,
        lastCommitAt: repoData.pushed_at,
        readmeHtml: readmeHtml,
        website: repoData.homepage || null,
    }
}