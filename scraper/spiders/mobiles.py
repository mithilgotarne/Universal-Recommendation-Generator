import scrapy
from bs4 import BeautifulSoup
from collections import OrderedDict
import json

class Mobiles(scrapy.Spider):
    name = "mobiles"
    l = 0
    def start_requests(self):
        with open('paginations.txt', 'r') as f:
            urls = f.read().split('\n')
        print(urls)
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        soup = BeautifulSoup(response.body, 'html.parser')
        # print(soup.prettify())
        specs_dict = OrderedDict()
        specs_dict['brand'] = soup.find(id = "brand").contents[0].strip(' \n\t\r')
        specs_dict['title'] = soup.find(id = "productTitle").contents[0].strip(' \n\t\r')
        try:
            specs_dict['price'] = soup.find(id = "priceblock_ourprice").contents[1].strip(' \n\t\r').replace(',', '')
        except AttributeError as e:
            try:
                specs_dict['price'] = soup.find(id = "priceblock_dealprice").contents[1].strip(' \n\t\r').replace(',', '')
            except AttributeError as e:
                specs_dict['price'] = "0"

        if soup.find(attrs={'class':'a-icon a-icon-star a-star-4-5'}) != None:
            specs_dict['rating'] = list(soup.find(attrs={'class':'a-icon a-icon-star a-star-4-5'}).children)[0].contents[0]
        elif soup.find(attrs={'class':'a-icon a-icon-star a-star-4'}) != None:
            specs_dict['rating'] = list(soup.find(attrs={'class':'a-icon a-icon-star a-star-4'}).children)[0].contents[0]
        elif soup.find(attrs={'class':'a-icon a-icon-star a-star-3'}) != None:
            specs_dict['rating'] = list(soup.find(attrs={'class':'a-icon a-icon-star a-star-3'}).children)[0].contents[0]
        elif soup.find(attrs={'class':'a-icon a-icon-star a-star-2'}) != None:
            specs_dict['rating'] = list(soup.find(attrs={'class':'a-icon a-icon-star a-star-2'}).children)[0].contents[0]
        elif soup.find(attrs={'class':'a-icon a-icon-star a-star-1'}) != None:
            specs_dict['rating'] = list(soup.find(attrs={'class':'a-icon a-icon-star a-star-1'}).children)[0].contents[0]
        for child in soup.find(attrs={'class':'attrG'}).descendants:
            temp_soup = BeautifulSoup(str(child), 'html.parser')
            try:
                label = temp_soup.find(attrs={'class':'label'}).contents[0].strip(' \n\t\r')
                value = temp_soup.find(attrs={'class':'value'}).contents[0].strip(' \n\t\r')
                if label not in specs_dict:
                    specs_dict[label] = value
            except Exception:
                pass
        specs_dict['image_url'] = soup.find(id = "landingImage")['src']
        yield specs_dict
        # for key in specs_dict:
        #     if self.l == 0:
        #         f_w.write(key + '\t')
        #         self.l+= 1
        # for key in specs_dict:
        #     f_w.write(specs_dict[key] + '\t')
        #     print(key, specs_dict[key])
        # print()
        # f_w.write('\n')
