// const jobTags = document.querySelectorAll(".job-tags");

const main = document.querySelector("main");
const mainDiv = document.querySelector(".main-card");

const header = document.createElement("header");
header.classList.add("grid", "grid-cols-[3fr_1fr]", "p-4", "bg-white", "w-[90%]", "rounded-lg", "mx-6", "z-40", "fixed", "top-28", "shadow-lg");
const searchElements = document.createElement("div");
searchElements.classList.add("search-elements", "flex", "flex-wrap",  "gap-4");

const clearElement = document.createElement("div");
clearElement.classList.add("clear", "text-[#7b8e8eff]", "font-bold", "flex", "items-center", "justify-end", "cursor-pointer");
clearElement.textContent = "Clear"


header.appendChild(searchElements);
header.appendChild(clearElement);

let jobData = [];

let activeFilter = [];


const seeElement = async (url, event) => {
    
    if(jobData.length === 0){
        const response = await fetch(url);
        jobData = await response.json();
    }

    const data = jobData;

    // console.log(jobData)
    
    let html = "";
    
    let search = "";
    
    
    if(event.classList.contains("role-tag") || event.classList.contains("language-tag") || event.classList.contains("level-tag") || event.classList.contains("tool-tag")){
        header.classList.remove("hidden");

        let filteredValue = event.textContent;
        
        mainDiv.appendChild(header)
        if (!activeFilter.includes(filteredValue)){
            activeFilter.push(filteredValue);

            // display the filtered value in header section in the ui
            main.classList.add("mt-[6rem]");
            activeFilter.forEach(filterElement => {
                search += `
                    <div class="elements flex ">
                        <div class="frontend bg-[#effafaff] text-[#5ba4a4ff] font-bold px-2">${filterElement}</div>
                        <span class="bg-[#5ba4a4ff] text-white element-clear px-2 font-bold cursor-pointer">X</span>
                    </div>
                `;
            });



            const filteredJobs = data.filter(job => {
                const jobCriteria = [job.role, job.level, ...job.languages, ...job.tools]

                // console.log(jobCriteria)
                return activeFilter.every(filter => jobCriteria.includes(filter));
            })

            console.log(activeFilter)

            // for the ui

            filteredJobs.forEach(element => {
                const languagesHtml = element.languages
                .map(lang => `<span class="language-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${lang}</span>`)
                .join('');

                // Map tools to spans with 'tool-tag' class
                const toolsHtml = element.tools
                    .map(tool => `<span class="tool-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${tool}</span>`)
                    .join('');

                // Combine both HTML strings for insertion
                const allTagsHtml = languagesHtml + toolsHtml; 
                html += `
                    <div class="job-card bg-[linear-gradient(to_right,#5ba4a4ff_7px,#fff_7px)] rounded-lg shadow-lg flex flex-col p-6 mx-6 relative">
                        <img src="${element.logo}" class="w-12 h-12 absolute -top-6" alt="Company logo">
                        <div class="job-company font-bold text-[#5ba4a4ff] w-full mb-3">
                        ${element.company} ${element.new ? '<span class="new-job rounded-2xl bg-[#5ba4a4ff] text-white font-bold py-1 px-3 ml-4 mr-2 text-center">NEW!</span> ' : ''} ${element.featured ? '<span class="featured-job rounded-3xl bg-[#2c3a3aff] text-white font-bold py-1 px-2.5 text-center">FEATURED</span>' : ''}
                        </div>
                        <div class="job-position text-[#2c3a3aff] font-bold mb-3">
                        ${element.position}
                        </div>
                        <div class="job-details flex items-center justify-start gap-4 mb-4">
                        <span class="posted-time font-bold text-[#7b8e8eff]">${element.postedAt}</span>
                        <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                        <span class="job-type font-bold text-[#7b8e8eff]">${element.contract}</span>
                        <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                        <span class="job-location font-bold text-[#7b8e8eff]">${element.location}</span>
                        </div>
                        <div class="job-tags flex items-center gap-4 border-t-2 border-blue-[#7b8e8eff] pt-4 mt-auto flex-wrap">
                        <span class="role-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.role}</span>
                        <span class="level-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.level}</span>
                        ${allTagsHtml}
                        </div>
                    </div>
                `;

            });

            main.innerHTML = "";
            searchElements.innerHTML = "";
            main.innerHTML = html;
            searchElements.innerHTML = search;
        }
    }
        
    // console.log(event.textContent, data, activeFilter);
}

const removedSearchElement = (e) => {
    const removedElement = e.target;
    const previousElement = removedElement.previousElementSibling.textContent;

    if (removedElement.classList.contains("element-clear")) {
        const removedElementIndex = activeFilter.indexOf(previousElement);

        
        activeFilter.splice(removedElementIndex,  1);
        
        if(activeFilter.length === 0){
            header.classList.add("hidden");

            let html = "";

            jobData.forEach(element => {
                const languagesHtml = element.languages
                .map(lang => `<span class="language-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${lang}</span>`)
                .join('');

                // Map tools to spans with 'tool-tag' class
                const toolsHtml = element.tools
                    .map(tool => `<span class="tool-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${tool}</span>`)
                    .join('');

                // Combine both HTML strings for insertion
                const allTagsHtml = languagesHtml + toolsHtml; 
                html += `
                    <div class="job-card bg-[linear-gradient(to_right,#5ba4a4ff_7px,#fff_7px)] rounded-lg shadow-lg flex flex-col p-6 mx-6 relative">
                        <img src="${element.logo}" class="w-12 h-12 absolute -top-6" alt="Company logo">
                        <div class="job-company font-bold text-[#5ba4a4ff] w-full mb-3">
                        ${element.company} ${element.new ? '<span class="new-job rounded-2xl bg-[#5ba4a4ff] text-white font-bold py-1 px-3 ml-4 mr-2 text-center">NEW!</span> ' : ''} ${element.featured ? '<span class="featured-job rounded-3xl bg-[#2c3a3aff] text-white font-bold py-1 px-2.5 text-center">FEATURED</span>' : ''}
                        </div>
                        <div class="job-position text-[#2c3a3aff] font-bold mb-3">
                        ${element.position}
                        </div>
                        <div class="job-details flex items-center justify-start gap-4 mb-4">
                        <span class="posted-time font-bold text-[#7b8e8eff]">${element.postedAt}</span>
                        <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                        <span class="job-type font-bold text-[#7b8e8eff]">${element.contract}</span>
                        <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                        <span class="job-location font-bold text-[#7b8e8eff]">${element.location}</span>
                        </div>
                        <div class="job-tags flex items-center gap-4 border-t-2 border-blue-[#7b8e8eff] pt-4 mt-auto flex-wrap">
                        <span class="role-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.role}</span>
                        <span class="level-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.level}</span>
                        ${allTagsHtml}
                        </div>
                    </div>
                `;

            });
            main.innerHTML = html;
            return;
        }

        // console.log(removedElementIndex, removedElement, activeFilter)
        let search = "";

        activeFilter.forEach(filterElement => {
            search += `
                <div class="elements flex ">
                    <div class="frontend bg-[#effafaff] text-[#5ba4a4ff] font-bold px-2">${filterElement}</div>
                    <span class="bg-[#5ba4a4ff] text-white element-clear px-2 font-bold cursor-pointer">X</span>
                </div>
            `;
        });

        searchElements.innerHTML = search;

        const filteredJobs = jobData.filter(job => {
            const jobCriteria = [job.role, job.level, ...job.languages, ...job.tools]

            return activeFilter.every(filter => jobCriteria.includes(filter));
        });

        let html = "";

        filteredJobs.forEach(element => {
            const languagesHtml = element.languages
            .map(lang => `<span class="language-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${lang}</span>`)
            .join('');

            // Map tools to spans with 'tool-tag' class
            const toolsHtml = element.tools
                .map(tool => `<span class="tool-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${tool}</span>`)
                .join('');

            // Combine both HTML strings for insertion
            const allTagsHtml = languagesHtml + toolsHtml; 
            html += `
                <div class="job-card bg-[linear-gradient(to_right,#5ba4a4ff_7px,#fff_7px)] rounded-lg shadow-lg flex flex-col p-6 mx-6 relative">
                    <img src="${element.logo}" class="w-12 h-12 absolute -top-6" alt="Company logo">
                    <div class="job-company font-bold text-[#5ba4a4ff] w-full mb-3">
                    ${element.company} ${element.new ? '<span class="new-job rounded-2xl bg-[#5ba4a4ff] text-white font-bold py-1 px-3 ml-4 mr-2 text-center">NEW!</span> ' : ''} ${element.featured ? '<span class="featured-job rounded-3xl bg-[#2c3a3aff] text-white font-bold py-1 px-2.5 text-center">FEATURED</span>' : ''}
                    </div>
                    <div class="job-position text-[#2c3a3aff] font-bold mb-3">
                    ${element.position}
                    </div>
                    <div class="job-details flex items-center justify-start gap-4 mb-4">
                    <span class="posted-time font-bold text-[#7b8e8eff]">${element.postedAt}</span>
                    <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                    <span class="job-type font-bold text-[#7b8e8eff]">${element.contract}</span>
                    <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                    <span class="job-location font-bold text-[#7b8e8eff]">${element.location}</span>
                    </div>
                    <div class="job-tags flex items-center gap-4 border-t-2 border-blue-[#7b8e8eff] pt-4 mt-auto flex-wrap">
                    <span class="role-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.role}</span>
                    <span class="level-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.level}</span>
                    ${allTagsHtml}
                    </div>
                </div>
            `;

        });
        main.innerHTML = html;
    }

}

const removeHeader = (e) => {
    const removedElement = e.target;

    if (removedElement.classList.contains("clear")) {
        header.classList.add("hidden");
        main.classList.remove("mt-[6rem]");

        let html = "";

        activeFilter = [];

        jobData.forEach(element => {
            const languagesHtml = element.languages
            .map(lang => `<span class="language-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${lang}</span>`)
            .join('');

            // Map tools to spans with 'tool-tag' class
            const toolsHtml = element.tools
                .map(tool => `<span class="tool-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${tool}</span>`)
                .join('');

            // Combine both HTML strings for insertion
            const allTagsHtml = languagesHtml + toolsHtml; 
            html += `
                <div class="job-card bg-[linear-gradient(to_right,#5ba4a4ff_7px,#fff_7px)] rounded-lg shadow-lg flex flex-col p-6 mx-6 relative">
                    <img src="${element.logo}" class="w-12 h-12 absolute -top-6" alt="Company logo">
                    <div class="job-company font-bold text-[#5ba4a4ff] w-full mb-3">
                    ${element.company} ${element.new ? '<span class="new-job rounded-2xl bg-[#5ba4a4ff] text-white font-bold py-1 px-3 ml-4 mr-2 text-center">NEW!</span> ' : ''} ${element.featured ? '<span class="featured-job rounded-3xl bg-[#2c3a3aff] text-white font-bold py-1 px-2.5 text-center">FEATURED</span>' : ''}
                    </div>
                    <div class="job-position text-[#2c3a3aff] font-bold mb-3">
                    ${element.position}
                    </div>
                    <div class="job-details flex items-center justify-start gap-4 mb-4">
                    <span class="posted-time font-bold text-[#7b8e8eff]">${element.postedAt}</span>
                    <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                    <span class="job-type font-bold text-[#7b8e8eff]">${element.contract}</span>
                    <i class="fa fa-circle text-[0.3rem] text-[#7b8e8eff]" aria-hidden="true"></i>
                    <span class="job-location font-bold text-[#7b8e8eff]">${element.location}</span>
                    </div>
                    <div class="job-tags flex items-center gap-4 border-t-2 border-blue-[#7b8e8eff] pt-4 mt-auto flex-wrap">
                    <span class="role-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.role}</span>
                    <span class="level-tag p-2 font-bold text-[#5ba4a4ff] bg-[#effafaff] cursor-pointer">${element.level}</span>
                    ${allTagsHtml}
                    </div>
                </div>
            `;

        });
        main.innerHTML = html;
        return;
    }
    console.log(removedElement)
}

main.addEventListener("click", (e) => {
    e.preventDefault()

    let targetElement = e.target
    seeElement("data.json", targetElement)
})

header.addEventListener("click", removedSearchElement)

header.addEventListener("click", removeHeader)