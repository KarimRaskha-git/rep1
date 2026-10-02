/* ============================================================
   PAGES — каталог
   ============================================================ */

function pageCatalog() {
  const f = state.filters;
  const list = filtered();

  const brands = [
    ...new Set(
      COMPONENTS.filter((c) => f.cats.length === 0 || f.cats.includes(c.cat))
        .map((c) => c.brand)
    ),
  ].sort();

  const catCount = (id) => COMPONENTS.filter((c) => c.cat === id).length;

  return `
  <section class="page active">
    <div class="cat-layout">
      <aside class="sidebar">
        <div class="filter-block">
          <div class="filter-title">Категории</div>
          ${CATEGORIES.map((c) => `
            <label class="check">
              <input type="checkbox" ${f.cats.includes(c.id) ? "checked" : ""}
                onchange="toggleFilter('cats','${c.id}')">
              <span>${c.icon} ${c.name}</span>
              <span class="count">${catCount(c.id)}</span>
            </label>`).join("")}
        </div>

        <div class="filter-block">
          <div class="filter-title">Цена, ₽</div>
          <div class="price-row">
            <input type="number" placeholder="от 1000" value="${f.min ?? ""}"
              onchange="setPrice('min', this.value)">
            <span style="color:var(--muted)">—</span>
            <input type="number" placeholder="до 100000" value="${f.max ?? ""}"
              onchange="setPrice('max', this.value)">
          </div>
        </div>

        <div class="filter-block">
          <div class="filter-title">Бренд</div>
          ${brands.map((b) => `
            <label class="check">
              <input type="checkbox" ${f.brands.includes(b) ? "checked" : ""}
                onchange="toggleFilter('brands','${esc(b)}')">
              <span>${esc(b)}</span>
            </label>`).join("")}
        </div>

        <div class="filter-block">
          <div class="filter-title">Наличие</div>
          <label class="check">
            <input type="checkbox" ${f.inStock ? "checked" : ""}
              onchange="toggleFilter('inStock', null)">
            <span>Только в наличии</span>
          </label>
        </div>

        <button class="btn btn-outline btn-block btn-sm" onclick="resetFilters()">Сбросить фильтры</button>
      </aside>

      <div>
        <div class="toolbar">
          <div class="count">Найдено товаров: <b>${list.length}</b>
            ${f.q ? " по запросу «" + esc(f.q) + "»" : ""}</div>
          <select onchange="state.filters.sort=this.value; render()">
            <option value="popular" ${f.sort === "popular" ? "selected" : ""}>Сортировка: Популярные</option>
            <option value="price-asc" ${f.sort === "price-asc" ? "selected" : ""}>Цена: по возрастанию</option>
            <option value="price-desc" ${f.sort === "price-desc" ? "selected" : ""}>Цена: по убыванию</option>
            <option value="rating" ${f.sort === "rating" ? "selected" : ""}>По рейтингу</option>
            <option value="name" ${f.sort === "name" ? "selected" : ""}>По названию</option>
          </select>
        </div>
        ${list.length
          ? `<div class="grid">${list.map(productCard).join("")}</div>`
          : `<div class="empty"><div style="font-size:38px;margin-bottom:12px">🔍</div>
               Ничего не найдено. Попробуйте изменить фильтры.</div>`}
      </div>
    </div>
  </section>`;
}