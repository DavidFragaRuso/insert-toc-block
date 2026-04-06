document.addEventListener('DOMContentLoaded', function () {

    const tocContainer = document.querySelector('.itb-toc-list');
    if (!tocContainer) return;

    const content = document.querySelector('.entry-content');
    if (!content) return;

    const headings = content.querySelectorAll('h2, h3');
    if (!headings.length) return;

    let usedIds = {};

    const tocItems = [];

    headings.forEach((heading, index) => {

        let text = heading.textContent.trim();

        let baseId = text
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '');

        if (!baseId) return;

        if (usedIds[baseId]) {
            usedIds[baseId]++;
            baseId += '-' + usedIds[baseId];
        } else {
            usedIds[baseId] = 1;
        }

        heading.id = baseId;

        tocItems.push({
            id: baseId,
            text: text,
            tag: heading.tagName
        });
    });

    const ul = document.createElement('ul');

    tocItems.forEach(item => {

        const li = document.createElement('li');
        li.className = 'toc-' + item.tag.toLowerCase();

        const a = document.createElement('a');
        a.href = '#' + item.id;
        a.textContent = item.text;

        li.appendChild(a);
        ul.appendChild(li);
    });

    tocContainer.appendChild(ul);
});