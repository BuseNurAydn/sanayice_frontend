const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const PRODUCTS_API = `${API_BASE}/products`;
const SECTION_API = `${API_BASE}/public/products`;

//ANASAYFA İÇİN ÜRÜNLER
export const getProducts = async (): Promise<any> => {
 
  const response = await fetch(PRODUCTS_API, {
  });

  if (!response.ok) {
    throw new Error("Veri alınamadı");
  }

  return response.json();
};
//detail

//Kategoriye ait ürünler için
export const getProductsByCategoryId = async (categoryId: string | number): Promise<any> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${PRODUCTS_API}/categories/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Ürünler alınamadı");

  return await response.json();
};

//Alt Kategoriye ait ürünler için
export const getProductsBySubCategoryId = async (subId: string | number): Promise<any> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${PRODUCTS_API}/subcategories/${subId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Ürünler alınamadı");

  return await response.json();
};

// SATICIYA AİT AKTİF ÜRÜNLER
export const getActiveProductsBySeller = async (sellerId: string | number): Promise<any> => {
  const response = await fetch(`${PRODUCTS_API}/seller/${sellerId}/store/active`);
  
  if (!response.ok) throw new Error("Satıcının ürünleri alınamadı");

  return response.json();
};

 //ÜRÜNE SORU SORMA
export const askProductQuestion = async (productId: string | number, questionText: string): Promise<any> => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE}/product-questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      productId,
      questionText,
    }),
  });

  if (!response.ok) throw new Error("Soru gönderilemedi");

  return response.json();
};

//Ürünün altına soruları getirme
export const getProductQuestions = async (productId: string | number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE}/product-questions/product/${productId}`);
    if (!response.ok) {
      throw new Error("Sorular alınamadı");
    }
    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

//Soru adedi için
export const getProductQuestionsCount = async (productId: string | number): Promise<any> => {
  const res = await fetch(`${API_BASE}/product-questions/product/${productId}/count`);
  if (!res.ok) throw new Error("Count alınamadı");
  const data = await res.json();
  return data; 
};

// Öne Çıkan Ürünler
export async function getFeaturedProducts(limit: number = 20): Promise<any> {
  const res = await fetch(`${SECTION_API}/popular?limit=${limit}`);
  return await res.json();
}

// Yeni Gelen Ürünler
export async function getDiscountedProducts(): Promise<any> {
  const res = await fetch(`${SECTION_API}/discounted`);
  return await res.json();
}

// Süper İndirimler
export async function getNewArrivals(days: number = 7): Promise<any> {
  const res = await fetch(`${SECTION_API}/new?days=${days}`);
  return await res.json();
}

