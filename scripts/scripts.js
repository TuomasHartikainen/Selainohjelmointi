document.addEventListener("DOMContentLoaded", function() {
    // Yhteydenottolomake
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        $('#contactMsg').html('<div class="alert alert-success">Kiitos yhteydenotosta! Otamme sinuun pian yhteyttä.</div>');
        this.reset();
    });

    let selectedSurface = null;

    // Pinnan valinta
    document.querySelectorAll('.test-surface').forEach(surface => {
        surface.addEventListener('click', function() {
            if (selectedSurface === this.id) {
                this.classList.remove('selected-surface');
                selectedSurface = null;
            } else {
                document.querySelectorAll('.test-surface').forEach(s => s.classList.remove('selected-surface'));
                this.classList.add('selected-surface');
                selectedSurface = this.id;
            }
        });
    });

    // Värin valinta
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

    // Custom väri
    document.getElementById('customColor').addEventListener('input', function() {
        if (!selectedSurface) {
            selectedSurface = 'surface1';
            document.getElementById('surface1').classList.add('selected-surface');
        }
        document.getElementById(selectedSurface).style.background = this.value;
        document.getElementById(selectedSurface + "Name").textContent = this.value;
    });

    // Tyhjennä
    document.getElementById('resetColors').addEventListener('click', function() {
        ['surface1','surface2'].forEach(id => {
            document.getElementById(id).style.background = '#fff';
            document.getElementById(id + "Name").textContent = '';
            document.getElementById(id).classList.remove('selected-surface');
        });
        selectedSurface = null;
    });
});