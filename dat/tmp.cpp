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
  string src = "instance100.txt";
  string dest = "instance100.js";
  fout.open(dest);
  fin.open(src);
  fout << "const dat = [\n";
  string data;
  getline(fin, data);
  for (int i = 0; i < 1500; i++)
  {
    getline(fin, data);
    splitString(arr, data);
    fout << "{\npos:{\nx:" << (arr[0]) << ",\ny:" << arr[1] << "\n},\nbeta:" << arr[3] << ",\n},\n";
  }
  fout << "]";
  fin.close();
  fout.close();
  return 0;
}