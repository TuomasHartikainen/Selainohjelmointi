document.addEventListener("DOMContentLoaded", function() {
    // Contact form (demo, no backend)
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        $('#contactMsg').html('<div class="alert alert-success">Kiitos yhteydenotosta! Otamme sinuun pian yhteyttä.</div>');
        this.reset();
    });

    // Gallery modal (optional, for extra wow)
    $('#gallery').on('click', '.gallery-img', function() {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt');
        $('body').append(`
            <div id="imgModal" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.7);display:flex;align-items:center;justify-content:center;z-index:9999;">
                <img src="${src}" alt="${alt}" style="max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 4px 32px #000;">
            </div>
        `);
        $('#imgModal').on('click', function() { $(this).remove(); });
    });

    let selectedSurface = null;

    // Pinnan valinta (toggle + vain yksi kerrallaan)
    document.querySelectorAll('.test-surface').forEach(surface => {
        surface.addEventListener('click', function() {
            if (selectedSurface === this.id) {
                // Klikattiin jo valittua pintaa → poista valinta
                this.classList.remove('selected-surface');
                selectedSurface = null;
            } else {
                // Valitse tämä pinta ja poista muilta
                document.querySelectorAll('.test-surface').forEach(s => s.classList.remove('selected-surface'));
                this.classList.add('selected-surface');
                selectedSurface = this.id;
            }
        });
    });

    // Valitse väri paletista
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.style.background = swatch.dataset.color;
        swatch.addEventListener('click', function() {
            if (!selectedSurface) {
                selectedSurface = 'surface1';
                document.getElementById('surface1').classList.add('selected-surface');
            }
            document.getElementById(selectedSurface).style.background = this.dataset.color;
            document.getElementById(selectedSurface + "Name").textContent = this.title || this.dataset.color;
        });
    });

    // Custom-väri
    document.getElementById('customColor').addEventListener('input', function() {
        if (!selectedSurface) {
            selectedSurface = 'surface1';
            document.getElementById('surface1').classList.add('selected-surface');
        }
        document.getElementById(selectedSurface).style.background = this.value;
        document.getElementById(selectedSurface + "Name").textContent = this.value;
    });

    // Reset
    document.getElementById('resetColors').addEventListener('click', function() {
        ['surface1','surface2'].forEach(id => {
            document.getElementById(id).style.background = '#fff';
            document.getElementById(id + "Name").textContent = '';
            document.getElementById(id).classList.remove('selected-surface');
        });
        selectedSurface = null;
    });
});