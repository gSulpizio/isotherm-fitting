clc
clear all
close all

[num1 Exceldata Raw]= xlsread('CO2_278.xlsx');
[num2 Exceldata Raw]= xlsread('CO2_288.xlsx');
[num3 Exceldata Raw]= xlsread('CO2_298.xlsx');


%% 3rd: 3rd form of the equation  normal and dual site langmuir-Freidrich
p288=num1(:,1);
n288=num1(:,2);

p298=num2(:,1);
n298=num2(:,2);

p308=num3(:,1);
n308=num3(:,2);

VmFe=0.846; % Vm=0.784673 cm3/gr
R=8314;     % the unit is [cm3.kPa/(K.mol)]

n288modified=n288+p288*10*VmFe/(R*278);
n298modified=n298+p298*10*VmFe/(R*288);
n308modified=n308+p308*10*VmFe/(R*298);
% a=length(nFe298modified)
L(1)=length(n288modified);
L(2)=length(n298modified);
L(3)=length(n308modified);
lengthmax=max(L);

A={'partial pressure','n288','partial pressure','n298','partial pressure','n308'};
for i=1:L(1)
    A{1+i,1}=p288(i,1);
    A{1+i,2}=n288modified(i,1);
end
for i=1:L(2)
   A{1+i,3}=p298(i,1);
   A{1+i,4}=n298modified(i,1);
end
for i=1:L(3)
    A{1+i,5}=p308(i,1);
    A{1+i,6}=n308modified(i,1);
end
 
    
    
filename='Totaladsorption.xlsx'
xlswrite(filename,A);