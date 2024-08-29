document.addEventListener('DOMContentLoaded', () => {
    const exoplanets = document.querySelectorAll('.exoplanet');
    const tooltip = document.querySelector('.tooltip');
    
    exoplanets.forEach((planet) => {
        planet.addEventListener('click', (event) => {
            const description = event.target.getAttribute('data-description');
            tooltip.textContent = description;
            tooltip.style.display = 'block';
            positionTooltip(event);
        });
        
        planet.addEventListener('mousemove', (event) => {
            if (tooltip.style.display === 'block') {
                positionTooltip(event);
            }
        });
        
        planet.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
    });

    function positionTooltip(event) {
        const rect = event.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top + window.scrollY - tooltipRect.height - 10; // Position above the planet

        // Adjust tooltip position to be within viewport bounds
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Adjust left position if tooltip is going off-screen on the left or right
        if (left < 0) {
            left = 0;
        } else if (left + tooltipRect.width > viewportWidth) {
            left = viewportWidth - tooltipRect.width;
        }

        // Adjust top position if tooltip is going off-screen on the top or bottom
        if (top < 0) {
            top = rect.bottom + 10; // Place below the planet if above viewport
        } else if (top + tooltipRect.height > viewportHeight) {
            top = viewportHeight - tooltipRect.height - 10; // Adjust position to fit within bottom viewport
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }
});
