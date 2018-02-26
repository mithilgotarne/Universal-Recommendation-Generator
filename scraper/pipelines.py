# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import re
from elasticsearch import Elasticsearch

class MobilePipeline(object):
    regex_list = [re.compile('(\d+\.?\d*) out of 5 stars'), re.compile('(\d+\.?\d*)\s*x\s*(\d+\.?\d*)\s*x\s*(\d+\.?\d*)'),
                  re.compile('(\d+)\s*GB'), re.compile('(\d+)\s*g'), re.compile('(\d+)\s*MP'), re.compile('(\d+)\s*mAh')]
    es = Elasticsearch('http://35.200.208.146:9200')
    doc_index = 0
    def process_item(self, item, spider):
        for key in item:
            for expression in self.regex_list:
                found = expression.match(item[key].lower())
                if found != None:
                    i = 0
                    for value in found.groups():
                        item[key + str(i)] = value
                        i+= 1
                    del item[key]
                    break
        for key in item:
            try:
                item[key] = float(item[key])
            except ValueError:
                pass
        # self.es.create('phones', 'amazon', self.doc_index, item)
        self.doc_index+= 1
        return item