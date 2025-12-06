const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

const CATEGORY_API = `${API_BASE}`;

const getToken = () => localStorage.getItem("token");

// KATEGORİLERİ LİSTELEME
export const fetchCategories = async (): Promise<any> => {
  
  const response = await fetch(`${CATEGORY_API}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Kategoriler alınamadı: ${response.status} ${errorText}`);
  }

  return response.json();
};

// ALT KATEGORİLERİ LİSTELEME
export const fetchSubcategories = async (): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${CATEGORY_API}/subcategories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Alt kategoriler alınamadı");

  return response.json();
};

// TIKLANAN KATEGORİYİ GETİR
export const getCategoryById = async (id: string | number): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${CATEGORY_API}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Kategori verisi alınamadı");

  return await response.json();
};

// TIKLANAN ALT KATEGORİYİ GETİR
export const getSubCategoryById = async (id: string | number): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${CATEGORY_API}/subcategories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Kategori verisi alınamadı");

  return await response.json();
};

// KATEGORİ / ALT KATEGORİ SİLME
export const deleteCategory = async (id: string | number, type: string = "category"): Promise<void> => {
  const token = getToken();

  const endpoint =
    type === "subcategory"
      ? `${CATEGORY_API}/managers/subcategories/${id}`
      : `${CATEGORY_API}/managers/categories/${id}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Silme işlemi başarısız");
};

// KATEGORİ GÜNCELLEME
export const updateCategory = async (id: string | number, formData: FormData): Promise<any> => {
  const token = getToken();

  const response = await fetch(`${CATEGORY_API}/managers/categories/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

   if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Güncelleme hatası:", errorData);
    throw new Error(errorData.message || "Kategori güncellenemedi.");
  }

  return await response.json();
};


// ALT KATEGORİ EKLE / GÜNCELLE
export const saveSubcategory = async (id: string | number | null, formData: FormData): Promise<any> => {
  const token = getToken();

  const url = id
    ? `${CATEGORY_API}/managers/subcategories/${id}`
    : `${CATEGORY_API}/managers/subcategories`;

  const method = id ? "PUT" : "POST";

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

   if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Alt Kategori kaydedilemedi.");
  }

  return await response.json();
};

// KATEGORİ EKLEME
export const addCategory = async (formData: FormData): Promise<any> => {
  const token = getToken();

 // formData mı gerçekten?
  if (!(formData instanceof FormData)) {
    throw new Error("Hatalı form verisi! CategoryData bekleniyor.");
  }

  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const response = await fetch(`${CATEGORY_API}/managers/categories`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Kategori eklenemedi.");
  }

  return await response.json();
};

