import gzip

# data_to_compress = open('frontend/styles/css/styles.css')
# gzip.compress(data_to_compress.)

with open('backend/catalog/static/styles/css/homepage/homepage.css', 'rb') as f_in:
    with gzip.open('backend/catalog/static/styles/css/homepage/homepage.css.gzipped.css', 'wb') as f_out:
        f_out.writelines(f_in)