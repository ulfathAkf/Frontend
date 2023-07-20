const [productList, setProductList] = useState([]);
Axios.get("http://localhost:3001/product/api/getProduct").then(
      (response) => {
        setProductList(response.data);
      }
    );
;

           <tbody>
                        {productList
                          .filter((product) => {
                            return search.toLowerCase() === ""
                              ? product
                              : product.product_name
                                  .toLowerCase()
                                  .includes(search.toLocaleLowerCase());
                          })
                          .map((product) => (
                            <tr key={product.product_id}>
                              <td>{product.product_id}</td>
                              <td>{product.product_name}</td>
                              <td>{product.selling_price}</td>
                              <td>{product.stock}</td>
                              <td>
                                <button
                                  class="atc_btn"
                                  onClick={() => {
                                    selectProduct(
                                      product.product_id,
                                      product.product_name,
                                      product.selling_price
                                    );
                                  }}
                                >
                                  ADD
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>