#include <iostream>
#include <fstream>
#include <string>
#include <iterator>
#include <sstream>
#include <math.h>
#include <stdlib.h>
using namespace std;

const double H_PI = 2 * M_PI;

double fRand(double fMin, double fMax)
{
  double f = (double)rand() / RAND_MAX;
  return fMin + f * (fMax - fMin);
}

template <size_t N>
void splitString(string (&arr)[N], string str)
{
  int n = 0;
  istringstream iss(str);
  for (auto it = istream_iterator<string>(iss); it != istream_iterator<string>() && n < N; ++it, ++n)
    arr[n] = *it;
}

int main()
{
  ofstream fout;
  ifstream fin;
  string line;
  string arr[5];
  string i, j;
  int ii, jj;
  cin >> i >> j >> ii >> jj;
  string s = "txt/data_100_10.txt";
  string source = "txt/data_" + i + "_" + j + ".txt";
  string dest = "js/data_" + i + "_" + j + ".js";
  fout.open(dest);
  fin.open(source);
  int c = 0;
  fout << "const S = " << ii - jj << "\nconst M = " << j << "\nexport {S,M}\nexport default dat = [\n";
  string data;
  getline(fin, data);
  getline(fin, data);
  while (c < ii)
  {
    getline(fin, data);
    splitString(arr,data);
    fout<<"{\npos:{\nx:"<< arr[1]<< ",\ny:"<< arr[0]<< "\n},\nbeta:"<< arr[4]<< "\n},";
    c++;
  }
  fout<<"\n]";
  fin.close();
  fout.close();
  return 0;
}